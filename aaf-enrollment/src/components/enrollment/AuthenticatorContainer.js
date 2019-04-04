import {indexedChainType, templateType} from '../../types/types';
import React from 'react';

import {
    abortEnrollProcess,
    beginEnrollProcess,
    createUserTemplate,
    deleteUserTemplate,
    doEnroll,
    getDefaultRecipient,
    getTotpQrCode,
    modifyUserTemplate
} from '../../actions/enrollment.actions';
import {connect} from 'react-redux';
import {
    getAndResetRedirectQuery, gotoEnrollmentDashboard, removeUnloadFormListener, setUnloadFormListener,
    showNavigationDialog,
} from '../../actions/navigation.actions';
import MethodAuthenticator from './MethodAuthenticator';
import PropTypes from 'prop-types';
import {createToast, STATUS_TYPE} from '../../ux/ux';
import TestAuthenticator from './test-authenticator/TestAuthenticator';
import {methodIds} from '../../data/MethodData';

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

        const comment = template.isEnrolled ? template.comment : ('My ' + template.methodTitle);

        // For WebAuthentication method, parse and remove query strings from redirect
        this.query = null;
        let testAuthenticator = false;
        if (this.props.template.methodId === methodIds.WEBAUTH) {
            this.query = this.props.getAndResetRedirectQuery();
            testAuthenticator = !!this.query.finish_test;

            if (!this.categoryFixed && this.query.category_id_input) {
                categoryIdInput = this.query.category_id_input;
            }
        }

        this.state = {
            categoryIdInput,
            comment,
            commentDirty: false,
            statusMessage: null,
            testAuthenticator
        };
    }

    // Answers "Can authentication info be saved by clicking Done?"
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

    authenticationInfoChanged() {
        return this.methodComponentRef.current.authenticationInfoChanged();
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
            return this.props.beginEnrollProcess(this.props.template.methodId)
                .then(({enrollProcessId}) => {
                    this.enrollProcessId = enrollProcessId;
                    this.enrollProcessStatus = ENROLL_PROCESS_STATUS.STARTED;
                })
                .catch(this.catchUnhandledEnrollError);
        };

        if (this.enrollProcessId) {
            return this.props.abortEnrollProcess(this.enrollProcessId)
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
            if (this.authenticatorUnsaved()) {
                return 'Changes will be lost if you leave this page.';
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
            return this.props.doEnroll(this.enrollProcessId, data, keepCamelCase, templateIdToModify)
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
        const title = 'Delete authenticator';
        const message = 'Are you sure you want to delete this authenticator?';
        this.props.showNavigationDialog(title, message, () => {
            this.props.deleteUserTemplate(id)
                .then(() => {
                    this.authenticatorDeleted = true;
                    this.props.gotoEnrollmentDashboard();
                    const description = `Authenticator "${methodTitle}" has been deleted.`;
                    createToast({ type: STATUS_TYPE.INFO, description });
                }, () => {});
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.saveAuthenticator(this.props.gotoEnrollmentDashboard);
    };

    resetEnrollState = () => {
        this.enrollProcessId = null;
        this.enrollProcessStatus = ENROLL_PROCESS_STATUS.NONE;
    };

    resetStatus = () => {
        this.setState({statusMessage: null});
    };

    // Save the authenticator (if needed), then return control to provided callback so navigation can continue.
    // - If authentication info already saved, just save the template
    // - Otherwise, if authentication info is savable, save it, then save the template
    // - Otherwise, if only the comment has changed for an enrolled template, just save the template
    saveAuthenticator = (callback) => {
        if (this.enrollProcessComplete()) {
            this.saveUserTemplate(callback);
        }
        else if (this.authenticationInfoSavable()) {
            this.methodComponentRef.current.finishEnroll()
                .then(() => this.saveUserTemplate(callback))
                .catch((error) => {
                    // Do not proceed with navigation if there is an enroll error
                    // There are many errors caught here. Only display errors that occurred due to FAILED enroll.
                    // For other errors, go to the homepage if the error has not been handled.
                    if (typeof error === 'string') {
                        this.showStatus(error, STATUS_TYPE.ERROR);
                    }
                    else if (!error.errorHandled) {
                        this.props.gotoEnrollmentDashboard();
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
                return this.props.modifyUserTemplate(enrollProcessId, template.id, this.state.comment);
            }
            else {
                return this.props.createUserTemplate(enrollProcessId, this.state.categoryIdInput, this.state.comment);
            }
        };

        // Once the template is saved, reset state and execute callback to allow navigation to continue.
        // If an error was handled, do nothing instead.
        const executeApiCallback = (data, saveSuccessful) => {
            if (saveSuccessful) {
                this.authenticatorSaved = true;
                const {methodTitle} = this.props.template;
                const description = `Authenticator "${methodTitle}" has been saved.`;
                createToast({ type: STATUS_TYPE.OK, description });
            }
            else if (data && data.errorHandled) {
                return;
            }

            if (enrollProcessComplete) {
                this.resetEnrollState();
            }

            // TODO: if an error is handled, should we execute the callback below? It might show the unsaved dialog
            //  and an error message at the same time.
            callback();
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
            show: template.isEnrolled,
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
                    getTotpQrCode={this.props.getTotpQrCode}
                    methodId={methodId}
                    onCategoryChange={this.handleCategoryChange}
                    onChainNavigation={this.saveAuthenticator}
                    onClose={gotoEnrollmentDashboard}
                    onCommentChange={this.handleCommentChange}
                    onDelete={this.handleDelete}
                    onSubmit={this.handleSubmit}
                    query={this.query}
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
                    query={this.query}
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

const mapStateToProps = ({ authentication, methodsDisplay: {categories, policies} }) =>
    ({ authentication, categories, policies });

const mapDispatchToProps = {
    abortEnrollProcess,
    beginEnrollProcess,
    createUserTemplate,
    deleteUserTemplate,
    doEnroll,
    getAndResetRedirectQuery,
    getDefaultRecipient,
    gotoEnrollmentDashboard,
    getTotpQrCode,
    modifyUserTemplate,
    removeUnloadFormListener,
    setUnloadFormListener,
    showNavigationDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatorContainer);
