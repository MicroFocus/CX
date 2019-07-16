import React from 'react';
import Authenticator from '../Authenticator';
import {getU2FOriginFromUrl, u2fParseError, u2fRegister} from '../../../api/devices/u2f-device.api';
import {STATUS_TYPE} from '../../../ux/ux';
import t from '../../../i18n/locale-keys';

class U2FMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dataDirty: false,
            detectingDevice: false      // True if "Detect U2F Device" button should be disabled
        };
        this.requests = null;           // Save register requests to allow retry of "Detect U2F Device"
    }                                   // without starting the enrollment process over

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return false;
    }

    detectDevice = () => {
        this.setState({
            dataDirty: true,
            detectingDevice: true
        });

        // If we don't have register requests yet, get them from server
        let promise;
        if (!this.requests) {
            const appId = getU2FOriginFromUrl(window.location.href);
            const userId = this.props.authentication.userId;
            const data = {appId, userId};
            promise = this.props.doEnrollWithBeginProcess(data, true)
                .then((data) => {
                    if (data.status === 'MORE_DATA') {
                        const {registerRequests, signRequests} = data;
                        this.requests = {registerRequests, signRequests};
                    }
                    else {
                        throw data;
                    }
                });
        }
        else {
            promise = Promise.resolve();
        }

        // Register and enroll device
        promise.then(() => {
            const {registerRequests, signRequests} = this.requests;
            this.props.showStatus(t.u2fWaitingFor(), STATUS_TYPE.INFO);
            return this.props.registerPromise(
                u2fRegister(registerRequests, signRequests)
            );
        }).then((registerResponse) => {
            this.requests = null;   // Signed requests are being submitted to server, so we cannot use them again
            return this.props.doEnrollWithBeginProcess({registerResponse}, true);
        }).then((response) => {
            if (response.status === 'OK') {
                this.props.showStatus(response.msg, STATUS_TYPE.OK);
            }
            else {
                throw response;
            }
        }).catch((error) => {
            this.setState({detectingDevice: false});
            const message = u2fParseError(error);
            this.props.showStatus(message, STATUS_TYPE.ERROR);
        });
    };

    render() {
        let detectButton = null;
        if (!this.props.template.isEnrolled) {
            detectButton = (
                <button
                    className="ias-button"
                    disabled={this.props.readonlyMode || this.state.detectingDevice}
                    id="Detect_Device_Button"
                    onClick={this.detectDevice}
                    type="button"
                >
                    {t.u2fDetectDevice()}
                </button>
            );
        }

        return (
            <Authenticator
                description={t.u2fMethodDescription()}
                {...this.props}
            >
                {detectButton}
            </Authenticator>
        );
    }
}

export default U2FMethod;
