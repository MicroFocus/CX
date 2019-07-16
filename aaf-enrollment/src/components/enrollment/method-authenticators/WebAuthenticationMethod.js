import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import {LoadingIndicator, STATUS_TYPE} from '../../../ux/ux';
import t from '../../../i18n/locale-keys';

const AUTH_STATES = {
    SELECT: 'SELECT',
    WAIT_IDP: 'WAIT_IDP',
    OK: 'OK',
    ERROR: 'ERROR',
    ENROLLED: 'ENROLLED'
};

// Enrolls web authentication in two phases.
// The first redirects the user, the second sets the enroll state and waits for the identity provider response
class WebAuthenticationMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        // Check for redirect query strings. Note that our api request function converts the keys to snake case
        let authState;
        const query = this.props.query;
        if (query.finish_enrollment) {
            // When redirected from web authentication, check status of do_enroll call until ready to save authenticator
            authState = AUTH_STATES.WAIT_IDP;
            this.props.setEnrollState(query.enroll_process_id);
            this.props.setAsyncEnroll((response) => {
                if (response.status === 'OK') {
                    this.setState({authState: AUTH_STATES.OK});
                }
                else {
                    this.setState({authState: AUTH_STATES.ERROR});
                    this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                }
            }, true);
        }
        else {
            authState = this.props.template.isEnrolled ? AUTH_STATES.ENROLLED : AUTH_STATES.SELECT;
        }

        const initialOtherState = { authState };
        generateFormChangeHandler(this, {
            idpValue: -1,
            usernameHint: ''
        }, initialOtherState);
    }

    authenticationInfoSavable() {
        return false;
    }

    authenticationInfoChanged() {
        const {authState} = this.state;
        if (authState === AUTH_STATES.SELECT) {
            return this.idpSelected();
        }

        return (authState === AUTH_STATES.WAIT_IDP || authState === AUTH_STATES.OK);
    }

    getEnrollElements() {
        const noIdpSelected = !this.idpSelected();

        const idps = this.getIdps();
        const idpOptions = Object.keys(idps).map((idpValue) => {
            const idp = idps[idpValue];
            return <option key={idp.uniqId} value={idpValue}>{idp.name}</option>;
        });

        return (
            <React.Fragment>
                <div className="ias-input-container">
                    <label htmlFor="selected_idp">
                        {t.identityProvider()}
                        <select
                            disabled={this.props.readonlyMode}
                            id="selected_idp"
                            onChange={this.handleChange}
                            name="idpValue"
                            value={this.state.form.idpValue}
                        >
                            <option disabled value="-1">
                                {t.identityProviderSelect()}
                            </option>
                            {idpOptions}
                        </select>
                    </label>
                </div>

                <div className="ias-input-container">
                    <input
                        disabled={noIdpSelected || this.props.readonlyMode}
                        id="username_hint"
                        name="usernameHint"
                        onChange={this.handleChange}
                        placeholder={t.webAuthUsernameHintLabel()}
                        type="text"
                        value={this.state.form.usernameHint}
                    />
                </div>

                <button
                    className="ias-button"
                    disabled={noIdpSelected || this.props.readonlyMode}
                    id="Start_Web_Auth_Button"
                    onClick={this.handleStartClick}
                    type="button"
                >
                    {t.buttonStart()}
                </button>
            </React.Fragment>
        );
    }

    getIdps() {
        return this.props.policies.webAuthMethod.data.idps;
    }

    getWebAuthSiteUrl() {
        return this.props.policies.webAuthMethod.publicUrl.siteUrlCurrent;
    }

    // When "Start" is clicked, submit final redirect data to AA server, then redirect to web authenticator site
    handleStartClick = () => {
        this.props.beginEnrollProcess().then(() => {
            const {idpValue, usernameHint} = this.state.form;
            const {categoryIdInput} = this.props;
            const enrollProcessId = this.props.getEnrollProcessId();
            const idpName = this.getIdps()[idpValue].name;
            const urlWithoutQueryString = window.location.href.split('?')[0];

            const data = {
                idpName,
                usernameHint,
                finalRedirection: {
                    action: urlWithoutQueryString,
                    method: 'GET',
                    data: {
                        ...this.props.query,
                        categoryIdInput,
                        enrollProcessId,
                        finishEnrollment: true
                    }
                }
            };

            this.props.doEnrollWithBeginProcess(data).then((result) => {
                if (result.status === 'MORE_DATA') {
                    this.props.removeUnloadFormListener();
                    const url = `${this.getWebAuthSiteUrl()}/${enrollProcessId}/enroll`;
                    window.open(url, '_self');
                }
            });
        });
    };

    idpSelected() {
        return (this.state.form.idpValue !== -1);
    }

    render() {
        const {authState} = this.state;

        if (authState === AUTH_STATES.WAIT_IDP) {
            return <LoadingIndicator message={t.loading()} />;
        }

        let enrollElements = null;
        if (authState === AUTH_STATES.SELECT) {
            enrollElements = this.getEnrollElements();
        }

        return (
            <Authenticator
                description={t.webAuthMethodDescription()}
                {...this.props}
            >
                {enrollElements}
            </Authenticator>
        );
    }
}

export default WebAuthenticationMethod;
