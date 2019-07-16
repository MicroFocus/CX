import {STATUS_TYPE} from '../../ux/ux';
import t from '../../i18n/locale-keys';

class FIDO2Handler {
    constructor(showStatus) {
        this.showStatus = showStatus;
    }

    webAuthnConfig = {
        timeout: 30000 // 30 seconds
    };

    checkBrowserSupportsWebAuthn() {
        // check for secure context

        if (!window.isSecureContext) {
            this.showStatus(t.webAuthenticationInsecureConnection(), STATUS_TYPE.ERROR);
            return false;
        }

        // check for WebAuthn CR features
        if (window.PublicKeyCredential === undefined ||
            typeof window.PublicKeyCredential !== 'function' ||
            typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !== 'function') {
            this.showStatus(t.webAuthenticationNotSupported(), STATUS_TYPE.ERROR);
            return false;
        }
        return true;
    }
}

export default FIDO2Handler;
