import PropTypes from 'prop-types';
import React from 'react';
import {Dialog, STATUS_TYPE} from '../../../ux/ux';
import {templateType} from '../../../types/types';
import './TestAuthenticator.scss';
import {connect} from 'react-redux';
import {deleteLogonProcess, doTestLogon} from '../../../actions/authentication.actions';
import AuthenticatorStatus from '../AuthenticatorStatus';
import TestMethodAuthenticator from './TestMethodAuthenticator';
import {removeUnloadFormListener} from '../../../actions/navigation.actions';
import {methodIds} from '../../../data/MethodData';
// Use trashable-react to get rid of pending promises when component unmounts.
// To use this feature, we wrap API calls that return Promises inside this.props.registerPromise.
// Note that children of this component (such as WindowsHelloMethod) do not need to call makeComponentTrashable to
// take advantage of this functionality; registerPromise is automatically passed to them via props.
import makeComponentTrashable from 'trashable-react';
import t from '../../../i18n/locale-keys';

const ASYNC_LOGON_INTERVAL = 3000;

const LOGON_PROCESS_STATUS = {
    NONE: 'NONE',
    MORE_DATA: 'MORE_DATA',
    OK: 'OK',
    FAILED: 'FAILED'
};

class TestAuthenticator extends React.PureComponent {
    constructor(props) {
        super(props);

        this.asyncLogonIntervalID = null;
        this.logonProcessId = null;
        this.logonProcessStatus = LOGON_PROCESS_STATUS.NONE;
        this.methodComponentRef = React.createRef();

        this.state = {
            statusMessage: null,
            testButtonDisabled: false,
            testComplete: false
        };
    }

    catchUnhandledLogonError = (failedResponseData) => {
        if (!failedResponseData.errorHandled) {
            this.resetLogonState();
        }

        throw failedResponseData;
    };

    clearAsyncLogon = () => {
        if (this.asyncLogonIntervalID) {
            clearInterval(this.asyncLogonIntervalID);
            this.asyncLogonIntervalID = null;
        }
    };

    componentWillUnmount() {
        this.clearAsyncLogon();

        if (this.logonProcessId) {
            // Since the component is unmounting, we don't need to update state after aborting logon process.
            // There isn't time to do this anyway.
            this.props.deleteLogonProcess(this.logonProcessId);
        }
    }

    doTestLogon = (data, keepCamelCase = false) => {
        // Perform a sanity check to make sure we never have a logon process that has already finished at this point
        if (this.logonProcessExpired()) {
            console.error('Cannot test a method once logon process has expired!');
            return Promise.reject(t.logonProcessExpiredError());
        }

        return this.props.registerPromise(
                this.props.doTestLogon(this.props.template.id, this.logonProcessId, data, keepCamelCase)
            ).catch(this.catchUnhandledLogonError)
            .then((response) => {
                const {result, logonProcessId} = response;
                this.logonProcessStatus = result.status;
                this.logonProcessId = logonProcessId;

                if (this.logonProcessStatus === LOGON_PROCESS_STATUS.OK) {
                    this.markTestComplete(true);
                }
                else if (this.logonProcessStatus === LOGON_PROCESS_STATUS.FAILED) {
                    this.markTestComplete(false, result.msg);
                }
                else if (this.logonProcessStatus === LOGON_PROCESS_STATUS.MORE_DATA) {
                    this.showStatus(result.msg, STATUS_TYPE.INFO);
                }

                return result;
            });
    };

    getDialogContent() {
        if (this.state.testComplete) {
            return (
                <React.Fragment>
                    <AuthenticatorStatus statusMessage={this.state.statusMessage} />
                    <div className="test-authenticator-buttons">
                        <button
                            className="ias-button"
                            id="Test_Authenticator_OK_Button"
                            onClick={this.props.onClose}
                            type="button"
                        >
                            {t.buttonOk()}
                        </button>
                    </div>
                </React.Fragment>
            );
        }
        else {
            const {statusMessage, testButtonDisabled} = this.state;
            const {authentication, policies, query, registerPromise, resetQuery, template} = this.props;

            return (
                <form onSubmit={this.handleSubmit}>
                    <AuthenticatorStatus statusMessage={statusMessage} />
                    <TestMethodAuthenticator
                        doTestLogon={this.doTestLogon}
                        getLogonProcessId={this.getLogonProcessId}
                        markTestComplete={this.markTestComplete}
                        methodId={template.methodId}
                        policies={policies}
                        query={query}
                        ref={this.methodComponentRef}
                        registerPromise={registerPromise}
                        removeUnloadFormListener={removeUnloadFormListener}
                        resetQuery={resetQuery}
                        setAsyncLogon={this.setAsyncLogon}
                        setLogonState={this.setLogonState}
                        setTestButtonAvailability={this.setTestButtonAvailability}
                        showStatus={this.showStatus}
                        template={template}
                        username={authentication.username}
                    />
                    <div className="test-authenticator-buttons">
                        <button className="ias-button" disabled={testButtonDisabled} id="Test_Authenticator_Button">
                            {t.buttonTest()}
                        </button>
                    </div>
                </form>
            );
        }
    }

    getLogonProcessId = () => this.logonProcessId;

    handleSubmit = (event) => {
        event.preventDefault();
        const {finishTest, state} = this.methodComponentRef.current;
        if (finishTest) {
            finishTest();
        }
        else {
            this.doTestLogon(state.form);
        }
    };

    logonProcessExpired() {
        const status = this.logonProcessStatus;
        return (status === LOGON_PROCESS_STATUS.OK || status === LOGON_PROCESS_STATUS.FAILED);
    }

    markTestComplete = (passed, reason) => {
        this.clearAsyncLogon();     // Clear async logon tasks for scenarios like TOTP offline authentication
        let statusMessage;
        if (passed) {
            statusMessage = { type: STATUS_TYPE.OK, description: t.testSuccessful() };
        }
        else {
            statusMessage = { type: STATUS_TYPE.ERROR, description: reason };
        }

        this.setState({
            testComplete: true,
            statusMessage
        });
    };

    resetLogonState = () => {
        this.logonProcessId = null;
        this.logonProcessStatus = LOGON_PROCESS_STATUS.NONE;
    };

    setAsyncLogon = (callback, executeImmediately = false) => {
        const executeAsyncLogon = () => {
            this.doTestLogon(null).then((response) => {
                if (response.status !== LOGON_PROCESS_STATUS.MORE_DATA) {
                    this.clearAsyncLogon();
                    callback(response);
                }
            }).catch(this.clearAsyncLogon);
        };

        if (executeImmediately) {
            executeAsyncLogon();
        }

        this.asyncLogonIntervalID = setInterval(executeAsyncLogon, ASYNC_LOGON_INTERVAL);
    };

    setLogonState = (logonProcessId) => {
        this.logonProcessId = logonProcessId;
        this.logonProcessStatus = LOGON_PROCESS_STATUS.MORE_DATA;
    };

    setTestButtonAvailability = (available) => {
        this.setState({
            testButtonDisabled: !available
        });
    };

    showStatus = (description, type) => {
        this.setState({
            statusMessage: { description, type }
        });
    };

    render() {
        const {onClose, template} = this.props;

        const dialogContent = this.getDialogContent();
        const addContainerClass = (template.methodId === methodIds.FACE) ? 'facial-test-dialog' : null;

        return (
            <Dialog
                addContainerClass={addContainerClass}
                omitActionButtons
                onCancel={onClose}
                onClose={onClose}
                open
                title={
                    <div className="ias-dialog-label">
                        {t.testMethodLabel(template.methodTitle)}
                    </div>
                }
            >
                {dialogContent}
            </Dialog>
        );
    }
}

TestAuthenticator.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    template: templateType.isRequired
};

// Wrapper for the component to hide it when test is done.
// This is what causes the component to be recreated when a new test window is opened
const TrashableTestAuthenticator = makeComponentTrashable(TestAuthenticator);
function TestAuthenticatorWrapper(props) {
    if (props.show) {
        return <TrashableTestAuthenticator {...props} />;
    }
    else {
        return null;
    }
}

const mapStateToProps = ({ authentication, methodsDisplay: {policies} }) => ({ authentication, policies });

const mapDispatchToProps = {
    deleteLogonProcess,
    doTestLogon,
    removeUnloadFormListener
};
export default connect(mapStateToProps, mapDispatchToProps)(TestAuthenticatorWrapper);
