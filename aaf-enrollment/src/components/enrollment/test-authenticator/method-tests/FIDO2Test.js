/* eslint-disable */

import React from 'react';
import {STATUS_TYPE, StatusIndicator} from '../../../../ux/ux';
import FIDO2Handler from '../../../../api/fido2';
import {WebAuthnApp} from 'webauthn-simple-app';

//TODO convert this to our localization
const _ = (value) => {
    return value;
};

class FIDO2Test extends React.PureComponent {
    constructor(props) {
        super(props);

        console.log(this.props);
        this.fido2Handler = new FIDO2Handler(this.props.showStatus);
        this.props.setTestButtonAvailability(false);
    }

    componentDidMount() {
        // check if the browser supports webauthn
        if (this.fido2Handler.checkBrowserSupportsWebAuthn()) {
            this.props.doTestLogon()
            .then((response) =>{
                if (response.status === 'MORE_DATA') {
                    this.handleMoreData(response);
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
    }

    getRegisterUrl= () => {
        return '/fido2/' + this.props.getLogonProcessId() + '/login';
    }

    checkWebAuthn() {
        // check if the browser supports webauthn
        return this.fido2Handler.checkBrowserSupportsWebAuthn.bind(this)();
    }

    handleMoreData = (response) => {
        console.log('handleMoreData', response);
        this.props.showStatus(response.msg, STATUS_TYPE.INFO);
        this.startLogon();
    }

    startLogon =() => {
        const WAConfig = this.getWebAuthnConfig();
        const waApp = new WebAuthnApp(WAConfig);
        return waApp.login()
            .then((result) => {
                console.log(result);
                if (result.status === 'ok') {
                    this.props.doTestLogon();
                } else {
                    this.props.markTestComplete(false, result.errorMessage);
                }
            })
            .catch((err) => {
                console.log('startLogin', err.message);
                this.props.markTestComplete(false, err.message);
            });
    }

    render() {
        return null;
    }
}

export default FIDO2Test;
