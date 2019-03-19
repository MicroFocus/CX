import React from 'react';
import Authenticator from '../Authenticator';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';
import FIDO2Handler from '../../../api/fido2';
import {WebAuthnApp} from 'webauthn-simple-app';
import { STATUS_TYPE } from '../../../ux/ux';

//TODO convert this to our localization
const _ = (value) => {
    return value;
};

class FIDO2Method extends React.PureComponent {
    constructor(props) {
        super(props);

        this.fido2Handler = new FIDO2Handler(this.props.showStatus);
        this.state = {dataDirty: false};
    }

    finishEnroll() {
        if (this.props.enrollProcessComplete()) {
            return Promise.resolve();
        }
        else {
            return Promise.reject('Did not complete enrollment');
        }
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    render() {
        return (
            <Authenticator
                description="To fill out"
                {...this.props}
            >
            <button type="button" className="ias-button" onClick={this.onClickDetect}>Detect Device</button>
                    <TestAuthenticatorButton {...this.props.test} />
            </Authenticator>
        );
    }

    onClickDetect = () => {
        this.props.resetEnrollState();
        this.doEnroll();
    }

    doEnroll = () => {
        this.props.doEnrollWithBeginProcess({rpId: window.location.hostname})
            .then((response) => {
                this.setState({dataDirty: true});
                if (response.status === 'MORE_DATA') {
                    this.handleMoreData(response);
                }
                else if (response.status === 'FAILED') {
                    this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                }
                else {
                    this.props.showStatus(response.msg, STATUS_TYPE.INFO);
                }
        });
    };

    getWebAuthnConfig = () => {
        const WAConfig = this.fido2Handler.webAuthnConfig;
        WAConfig.username = this.props.authentication.username;
        WAConfig.registerChallengeEndpoint = this.getRegisterUrl.bind(this)();
        WAConfig.registerResponseEndpoint = this.getRegisterUrl.bind(this)();
        return WAConfig;
    }

    beforeDoEnroll() {
        return {...this.state, ...{data: {rpId: window.location.hostname}}};
    }

    handleMoreData(response) {
        this.props.showStatus(response.msg, STATUS_TYPE.INFO);
        this.startEnrollment();
    }

    getRegisterUrl= () => {
        return '/fido2/' + this.props.getEnrollProcessId() + '/enroll';
    }

    componentDidMount() {
        // check if the browser supports webauthn
        this.fido2Handler.checkBrowserSupportsWebAuthn();
    }

    handleSubmit() {
        this.props.showStatus(_('Success'), STATUS_TYPE.OK);
        this.props.doEnrollWithBeginProcess();
    }

    startEnrollment = () => {
        const WAConfig = this.getWebAuthnConfig();
        const waApp = new WebAuthnApp(WAConfig);
        waApp.register()
        .then((cred) => {
            this.handleSubmit();
        })
        .catch((err) => {
            this.fido2Handler.updateError(_('Failed'));
        });
    }
}

export default FIDO2Method;
