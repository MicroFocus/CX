/* eslint-disable */

import {STATUS_TYPE} from '../ux/ux';

//TODO convert this to our localization
const _ = (value) => {
    return value;
};

//TODO: convert this localization file
const __ = (value) => {
    return value;
};


class FIDO2Handler {
    super(showStatus) {
        this.showStatus = showStatus;
        console.log("showStatus", this.showStatus);
    }

    START_MSG() {
        return (__('Click "Save" to start enrollment'));
    }

    WEBAUTHN_NOT_SUPPORTED() {
        return (_('Web Authentication is not currently supported by this browser'));
    }

    WEBAUTHN_INSECURE_CONNECTION() {
        return (_('This web page was not loaded in a secure context (https). Please try loading the page again using https or make sure you are using a browser with secure context support.'));
    }

    webAuthnConfig = {
        timeout: 30000 // 30 seconds
    }

    checkBrowserSupportsWebAuthn() {
        // check for secure context

        if (!window.isSecureContext) {
            this.updateError.bind(this)(this.WEBAUTHN_INSECURE_CONNECTION(), 'warning');
            return false;
        }

        // check for WebAuthn CR features
        if (window.PublicKeyCredential === undefined ||
            typeof window.PublicKeyCredential !== 'function' ||
            typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !== 'function') {
            this.updateError.bind(this)(this.WEBAUTHN_NOT_SUPPORTED(), 'warning');
            return false;
        }
        return true;
    }

    updateError(errMsg, cls) {
        let type = STATUS_TYPE.INFO;

        if (!cls) {
            //cls = 'danger';
            type = STATUS_TYPE.ERROR;
        }

        if (cls === 'warning') {
            type = STATUS_TYPE.WARN;
        }

        if (this.isScanning) {
            this.showStatus(errMsg, type);
        }
    }

}

// class LogonFIDO2Handler {
//     constructor(logonProcessId) {
//         this.logonProcessId = logonProcessId;
//     }

//     function getWebAuthnConfig() {
//         const WAConfig = webAuthnConfig;
//         WAConfig.username = this.state.user_name || AuthStore.getUserName();
//         WAConfig.loginChallengeEndpoint = this.getLoginUrl.bind(this)();
//         WAConfig.loginResponseEndpoint = this.getLoginUrl.bind(this)();
//         return WAConfig;
//     }

//     function getLoginUrl() {
//         return '/fido2/' + this.logonProcessId + '/login';
//     }

//     function checkWebAuthn() {
//         // check if the browser supports webauthn
//         return checkBrowserSupportsWebAuthn.bind(this)();
//     }

//     function startLogon() {
//         const WAConfig = this.getWebAuthnConfig.bind(this)();
//         const waApp = new WebAuthnApp(WAConfig);
//         return waApp.login();
//     }
// };

// FIDO2Handler.webAuthnConfig = {
//     timeout: 30000 // 30 seconds
// };

export default FIDO2Handler;