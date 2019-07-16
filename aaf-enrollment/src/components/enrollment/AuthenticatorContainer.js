import {indexedChainType, templateType} from '../../types/types';
import React from 'react';
import {
    abortEnrollProcess, beginEnrollProcess, createUserTemplate, deleteUserTemplate, doEnroll, getDefaultRecipient,
    getTotpQrCode, getWinHelloInfo, modifyUserTemplate
} from '../../actions/enrollment.actions';
import {connect} from 'react-redux';
import {
    getAndResetRedirectQuery, gotoEnrollmentDashboard, removeUnloadFormListener, setUnloadFormListener,
    showNavigationDialog, viewChainAuthenticator
} from '../../actions/navigation.actions';
import MethodAuthenticator from './MethodAuthenticator';
import PropTypes from 'prop-types';
import {createToast, STATUS_TYPE} from '../../ux/ux';
import TestAuthenticator from './test-authenticator/TestAuthenticator';
import {methodIds} from '../../data/MethodData';
// Use trashable-react to get rid of pending promises when component unmounts.
// To use this feature, we wrap API calls that return Promises inside this.props.registerPromise.
// Note that children of this component (such as WindowsHelloMethod) do not need to call makeComponentTrashable to
// take advantage of this functionality; registerPromise is automatically passed to them via props.
import makeComponentTrashable from 'trashable-react';
import {fetchIndexedData} from '../../actions/methods-display.actions';
import t from '../../i18n/locale-keys';

const ASYNC_ENROLL_INTERVAL = 3000;

const ENROLL_PROCESS_STATUS = {
    NONE: 'NONE',
    STARTED: 'STARTED',
    MORE_DATA: 'MORE_DATA',
    OK: 'OK',
    FAILED: 'FAILED'
};

class AuthenticatorContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        const {template} = props;

        this.authenticatorSaved = false;
        this.enrollProcessId = null; // If non-null, an active enroll process exists
        this.enrollProcessStatus = ENROLL_PROCESS_STATUS.NONE;
        this.asyncEnrollIntervalID = null;
        this.authenticatorDeleted = false;
        this.methodComponentRef = React.createRef();

        let categoryIdInput;
        this.categoryFixed = true;
        if (template.isEnrolled) {
            categoryIdInput = template.categoryId;
        }
        else {
            categoryIdInput = template.availableCategoryIds[0];
            this.categoryFixed = (template.availableCategoryIds.length <= 1);
        }

        const comment = template.isEnrolled ? template.comment : t.authenticatorPossessive(template.methodTitle);

        // For WebAuthentication method, parse and remove query strings from redirect
        let query = null;
        let testAuthenticator = false;
        if (this.props.template.methodId === methodIds.WEBAUTH) {
            query = this.props.getAndResetRedirectQuery();
            testAuthenticator = !!query.finish_test;

            if (!this.categoryFixed && query.category_id_input) {
                categoryIdInput = query.category_id_input;
            }
        }

        this.state = {
            categoryIdInput,
            comment,
            commentDirty: false,
            query,
            statusMessage: null,
            testAuthenticator
        };
    }

    authenticationInfoChanged() {
        return this.methodComponentRef.current.authenticationInfoChanged();
    }

    // Answers "Can authentication info be saved by clicking Done?"
    // (Note: Authentication info means password, etc. saved in doEnroll call. Template is saved separately.)
    // There are two use cases when this will yield a different result than calling authenticationInfoChanged:
    // - Will return false for methods which must wait for actions before completing the enroll process
    // - Will return true for auto-enrolled methods which can be saved even if no data has been entered
    authenticationInfoSavable() {
        if (this.methodComponentRef.current.authenticationInfoSavable) {
            return this.methodComponentRef.current.authenticationInfoSavable();
        }
        else {  // This is equivalent to authenticationInfoChanged when the method is not implemented
            return this.authenticationInfoChanged();
        }
    }

    // Check whether authenticator is unsaved so we can warn user before leaving the page
    authenticatorUnsaved() {
        if (this.authenticatorSaved || this.authenticatorDeleted) {
            return false;
        }
        else {
            return (this.state.commentDirty || this.authenticationInfoChanged());
        }
    }

    // Start a new enroll process. Abort any current one first.
    beginEnrollProcess = () => {
        const executeBeginEnroll = () => {
            return this.props.registerPromise(
                    this.props.beginEnrollProcess(this.props.template.methodId)
                )
                .then(({enrollProcessId}) => {
                    this.enrollProcessId = enrollProcessId;
                    this.enrollProcessStatus = ENROLL_PROCESS_STATUS.STARTED;
                })
                .catch(this.catchUnhandledEnrollError);
        };

        if (this.enrollProcessId) {
            return this.props.registerPromise(
                    this.props.abortEnrollProcess(this.enrollProcessId)
                )
                .then(executeBeginEnroll);
        }
        else {
            return executeBeginEnroll();
        }
    };

    catchUnhandledEnrollError = (failedResponseData) => {
        if (!failedResponseData.errorHandled) {
            this.resetEnrollState();
        }

        throw failedResponseData;
    };

    clearAsyncEnroll = () => {
        if (this.asyncEnrollIntervalID) {
            clearInterval(this.asyncEnrollIntervalID);
            this.asyncEnrollIntervalID = null;
        }
    };

    componentDidMount() {
        if (this.props.setBeforeNavigationListener) {
            this.props.setBeforeNavigationListener(this.saveAuthenticator);
        }

        this.props.setUnloadFormListener(() => {
            if (!this.isReadonlyMode() && this.authenticatorUnsaved()) {
                return t.unsavedWorkWarning();
            }

            return false;
        });
    }

    componentWillUnmount() {
        this.clearAsyncEnroll();
        this.props.removeUnloadFormListener();
        if (this.enrollProcessId) {
            // Since the component is unmounting, we don't need to update state after aborting enroll process.
            // There isn't time to do this anyway.
            this.props.abortEnrollProcess(this.enrollProcessId);
        }
    }

    doEnrollWithBeginProcess = (data, keepCamelCase = false, includeTemplateId = false) => {
        const templateIdToModify = includeTemplateId ? this.props.template.id : null;   // For methods like HOTP:1

        const executeEnroll = () => {
            return this.props.registerPromise(
                    this.props.doEnroll(this.enrollProcessId, data, keepCamelCase, templateIdToModify)
                )
                .catch(this.catchUnhandledEnrollError)
                .then(response => {
                    this.enrollProcessStatus = response.status;

                    if (response.reason === 'PROCESS_NOT_FOUND_OR_EXPIRED') {
                        this.resetEnrollState();
                        createToast({ type: STATUS_TYPE.ERROR, description: response.msg });
                        response.errorHandled = true;
                        throw response;
                    }
                    else {
                        return response;
                    }
                });
        };

        if (this.enrollProcessStatus === ENROLL_PROCESS_STATUS.STARTED ||
            this.enrollProcessStatus === ENROLL_PROCESS_STATUS.MORE_DATA) {
            return executeEnroll();
        }
        else {
            return this.beginEnrollProcess().then(executeEnroll);
        }
    };

    enrollProcessComplete = () => this.enrollProcessStatus === ENROLL_PROCESS_STATUS.OK;

    getEnrollProcessId = () => this.enrollProcessId;

    handleCategoryChange = (event) => {
        this.setState({
            categoryIdInput: event.target.value
        });
    };

    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value,
            commentDirty: true
        });
    };

    handleDelete = () => {
        const {id, methodTitle} = this.props.template;
        const title = t.authenticatorDeleteWarningTitle();
        const message = t.authenticatorDeleteWarning();
        this.props.showNavigationDialog(title, message, () => {
            this.props.registerPromise(
                    this.props.deleteUserTemplate(id)
                )
                .then(() => {
                    this.authenticatorDeleted = true;
                    this.props.gotoEnrollmentDashboard();
                    const description = t.authenticatorDeleted(methodTitle);
                    createToast({ type: STATUS_TYPE.INFO, description });
                }, () => {});
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.saveAuthenticator(() => {
            // After saving authenticator, go to next method in chain sequence, or dashboard if no chain sequence
            const {chain, gotoEnrollmentDashboard} = this.props;
            if (chain) {
                const {chainSequenceIndex} = this.props;
                const chainSequenceLength = chain.templates.length;
                if (chainSequenceIndex === chainSequenceLength - 1) {   // Last method in sequence, go to dashboard
                    gotoEnrollmentDashboard();
                }
                else {
                    const newChainSequenceIndex = this.props.chainSequenceIndex + 1;
                    const newTemplate = chain.templates[newChainSequenceIndex];
                    this.props.fetchIndexedData();
                    this.props.viewChainAuthenticator(chain, newTemplate);
                }
            }
            else {
                gotoEnrollmentDashboard();
            }
        });
    };

    // Indicates if the authenticator information cannot be enrolled. Only occurs when a template is enrolled
    // and re-enrollment is disabled.
    isReadonlyMode() {
        if (!this.props.policies || !this.props.template.isEnrolled) {
            return false;
        }

        return this.props.policies.templateOptions.data.disableReenrollment;
    }

    resetEnrollState = () => {
        this.enrollProcessId = null;
        this.enrollProcessStatus = ENROLL_PROCESS_STATUS.NONE;
    };

    resetQuery = () => {
        this.setState({query: {}});
    };

    resetStatus = () => {
        this.setState({statusMessage: null});
    };

    // Save the authenticator (if needed), then return control to provided callback so navigation can continue.
    // - If existing authenticator cannot be edited, just save the template (if comment changed)
    // - If authentication info already saved, just save the template
    // - Otherwise, if authentication info is savable, save it, then save the template
    // - Otherwise, if only the comment has changed for an enrolled template, just save the template
    saveAuthenticator = (callback) => {
        if (this.isReadonlyMode() && this.props.template.isEnrolled) {
            if (this.state.commentDirty) {
                this.saveUserTemplate(callback);
            }
            else {
                callback();
            }
        }
        else if (this.enrollProcessComplete()) {
            this.saveUserTemplate(callback);
        }
        else if (this.authenticationInfoSavable()) {
            this.methodComponentRef.current.finishEnroll()
                .then(() => this.saveUserTemplate(callback))
                .catch((error) => {
                    // Do not proceed with navigation if there is an enroll error
                    // There are many errors caught here. Only display errors that occurred due to FAILED enroll.
                    // All other errors are handled and reported higher up in the Promise chain.
                    if (typeof error === 'string') {
                        this.showStatus(error, STATUS_TYPE.ERROR);
                    }
                });
        }
        else if (this.state.commentDirty && this.props.template.isEnrolled && !this.authenticationInfoChanged()) {
            this.saveUserTemplate(callback);    // Comment has been changed, just save it
        }
        else {
            callback();
        }
    };

    saveUserTemplate = (callback) => {
        const enrollProcessComplete = this.enrollProcessComplete();
        const enrollProcessId = enrollProcessComplete ? this.enrollProcessId : null;
        const template = this.props.template;

        const executeApiCall = () => {
            if (template.isEnrolled) {
                return this.props.registerPromise(
                    this.props.modifyUserTemplate(enrollProcessId, template.id, this.state.comment)
                );
            }
            else {
                return this.props.registerPromise(
                    this.props.createUserTemplate(enrollProcessId, this.state.categoryIdInput, this.state.comment)
                );
            }
        };

        // Once the template is saved, reset state.
        // If the save was successful, notify user, then execute callback to allow navigation to continue.
        const executeApiCallback = (data, saveSuccessful) => {
            if (enrollProcessComplete) {
                this.resetEnrollState();
            }

            if (saveSuccessful) {
                this.authenticatorSaved = true;
                const {methodTitle} = this.props.template;
                const description = t.authenticatorSaved(methodTitle);
                createToast({ type: STATUS_TYPE.OK, description });
                callback();
            }
        };

        executeApiCall().then(
            (result) => executeApiCallback(result, true),
            (error) => executeApiCallback(error, false)
        );
    };

    setAsyncEnroll = (callback, executeImmediately = false) => {
        const executeAsyncEnroll = () => {
            this.doEnrollWithBeginProcess(null).then((response) => {
                if (response.status !== ENROLL_PROCESS_STATUS.MORE_DATA) {
                    this.clearAsyncEnroll();
                    callback(response);
                }
            }).catch(this.clearAsyncEnroll);
        };

        this.clearAsyncEnroll();    // Don't allow multiple asnyc enroll intervals.

        if (executeImmediately) {
            executeAsyncEnroll();
        }

        this.asyncEnrollIntervalID = setInterval(executeAsyncEnroll, ASYNC_ENROLL_INTERVAL);
    };

    setEnrollState = (enrollProcessId) => {
        this.enrollProcessId = enrollProcessId;
        this.enrollProcessStatus = ENROLL_PROCESS_STATUS.MORE_DATA;
    };

    toggleTestAuthenticator = () => {
        this.setState({ testAuthenticator: !this.state.testAuthenticator });
    };

    showStatus = (description, type) => {
        this.setState({
            statusMessage: { description, type }
        });
    };

    render() {
        const {policies, template, gotoEnrollmentDashboard} = this.props;

        if (!policies) {
            return null;
        }

        const methodId = template.methodId;
        const test = {
            show: template.isFullyEnrolled,
            onClick: this.toggleTestAuthenticator
        };

        // Make sure to put beginEnrollProcess after {...this.props} so it will override the action creator of the
        // same name.
        return (
            <React.Fragment>
                <MethodAuthenticator
                    categoryIdInput={this.state.categoryIdInput}
                    categoryFixed={this.categoryFixed}
                    comment={this.state.comment}
                    doEnrollWithBeginProcess={this.doEnrollWithBeginProcess}
                    enrollProcessComplete={this.enrollProcessComplete}
                    getEnrollProcessId={this.getEnrollProcessId}
                    methodId={methodId}
                    onCategoryChange={this.handleCategoryChange}
                    onChainNavigation={this.saveAuthenticator}
                    onClose={gotoEnrollmentDashboard}
                    onCommentChange={this.handleCommentChange}
                    onDelete={this.handleDelete}
                    onSubmit={this.handleSubmit}
                    query={this.state.query}
                    readonlyMode={this.isReadonlyMode()}
                    ref={this.methodComponentRef}
                    resetEnrollState={this.resetEnrollState}
                    resetStatus={this.resetStatus}
                    setAsyncEnroll={this.setAsyncEnroll}
                    setEnrollState={this.setEnrollState}
                    showStatus={this.showStatus}
                    statusMessage={this.state.statusMessage}
                    test={test}
                    toggleTestAuthenticator={this.toggleTestAuthenticator}
                    {...this.props}
                    beginEnrollProcess={this.beginEnrollProcess}
                />
                <TestAuthenticator
                    onClose={this.toggleTestAuthenticator}
                    query={this.state.query}
                    resetQuery={this.resetQuery}
                    show={this.state.testAuthenticator}
                    template={template}
                />
            </React.Fragment>
        );
    }
}

AuthenticatorContainer.propTypes = {
    chain: indexedChainType,
    setBeforeNavigationListener: PropTypes.func,
    template: templateType.isRequired
};

const mapStateToProps = ({
    authentication, methodsDisplay: {categories, indexedData: {alwaysHideCategories}, policies}
}) => ({ alwaysHideCategories, authentication, categories, policies });

const mapDispatchToProps = {
    abortEnrollProcess,
    beginEnrollProcess,
    createUserTemplate,
    deleteUserTemplate,
    doEnroll,
    fetchIndexedData,
    getAndResetRedirectQuery,
    getDefaultRecipient,
    getTotpQrCode,
    getWinHelloInfo,
    gotoEnrollmentDashboard,
    modifyUserTemplate,
    removeUnloadFormListener,
    setUnloadFormListener,
    showNavigationDialog,
    viewChainAuthenticator
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(AuthenticatorContainer);
export default makeComponentTrashable(connectedComponent);
