import React from 'react';
import {STATUS_TYPE} from '../../../../ux/ux';
import FIDO2Handler from '../../../../api/devices/fido2-device.api';
import {WebAuthnApp} from 'webauthn-simple-app';

class FIDO2Test extends React.PureComponent {
    constructor(props) {
        super(props);

        this.fido2Handler = new FIDO2Handler(this.props.showStatus);
        this.props.setTestButtonAvailability(false);
    }

    componentDidMount() {
        // check if the browser supports webauthn
        if (this.fido2Handler.checkBrowserSupportsWebAuthn()) {
            this.props.doTestLogon()
            .then((response) =>{
                if (response.status === 'MORE_DATA') {
                    this.props.showStatus(response.msg, STATUS_TYPE.INFO);
                    this.startLogon();
                }
            });
        }
    }

    getWebAuthnConfig = () => {
        const WAConfig = this.fido2Handler.webAuthnConfig;
        WAConfig.username = this.props.username;
        WAConfig.loginChallengeEndpoint = this.getRegisterUrl();
        WAConfig.loginResponseEndpoint = this.getRegisterUrl();
        return WAConfig;
    };

    getRegisterUrl = () => {
        return `/api/v1/logon_method/FIDO2:1/login/${this.props.getLogonProcessId()}`;
    };

    startLogon = () => {
        const WAConfig = this.getWebAuthnConfig();
        const waApp = new WebAuthnApp(WAConfig);
        return this.props.registerPromise(
                waApp.login()
            ).then((result) => {
                if (result.status === 'ok') {
                    this.props.setAsyncLogon(() => {}, true);
                }
                else {
                    this.props.markTestComplete(false, result.errorMessage);
                }
            })
            .catch((err) => {
                this.props.markTestComplete(false, err.message);
            });
    };

    render() {
        return null;
    }
}

export default FIDO2Test;
