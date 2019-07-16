import React from 'react';
import Authenticator from '../Authenticator';
import FIDO2Handler from '../../../api/devices/fido2-device.api';
import {WebAuthnApp} from 'webauthn-simple-app';
import { STATUS_TYPE } from '../../../ux/ux';
import t from '../../../i18n/locale-keys';

class FIDO2Method extends React.PureComponent {
    constructor(props) {
        super(props);

        this.fido2Handler = new FIDO2Handler(this.props.showStatus);
        this.state = {dataDirty: false};
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return false;
    }

    componentDidMount() {
        // check if the browser supports webauthn
        this.fido2Handler.checkBrowserSupportsWebAuthn();
    }

    getRegisterUrl = () => {
        return `/api/v1/logon_method/FIDO2:1/enroll/${this.props.getEnrollProcessId()}`;
    };

    getWebAuthnConfig = () => {
        const WAConfig = this.fido2Handler.webAuthnConfig;
        WAConfig.username = this.props.authentication.username;
        WAConfig.registerChallengeEndpoint = this.getRegisterUrl();
        WAConfig.registerResponseEndpoint = this.getRegisterUrl();
        return WAConfig;
    };

    detectDevice = () => {
        this.props.resetEnrollState();
        this.setState({dataDirty: true});
        this.props.doEnrollWithBeginProcess({rpId: window.location.hostname})
            .then((response) => {
                if (response.status === 'MORE_DATA') {
                    this.props.showStatus(response.msg, STATUS_TYPE.INFO);
                    this.startEnrollment();
                }
                else if (response.status === 'FAILED') {
                    this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                }
                else {
                    this.props.showStatus(response.msg, STATUS_TYPE.INFO);
                }
            });
    };

    startEnrollment = () => {
        const WAConfig = this.getWebAuthnConfig();
        const waApp = new WebAuthnApp(WAConfig);
        this.props.registerPromise(
            waApp.register()
        ).then((cred) => {
            this.props.setAsyncEnroll((response) => {
                if (response.status !== 'OK') {
                    this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                    this.props.resetEnrollState();
                }
                else {
                    this.props.showStatus(response.msg, STATUS_TYPE.OK);
                }
            }, true);
        })
        .catch((err) => {
            this.props.showStatus(t.fido2Error(), STATUS_TYPE.ERROR);
        });
    };

    render() {
        return (
            <Authenticator
                description={t.fido2MethodDescription()}
                {...this.props}
            >
                <button
                    className="ias-button"
                    disabled={this.props.readonlyMode}
                    id="Detect_Device_Button"
                    onClick={this.detectDevice}
                    type="button"
                >
                    {t.fido2DetectDevice()}
                </button>
            </Authenticator>
        );
    }
}

export default FIDO2Method;
