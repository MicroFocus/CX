import React from 'react';
import Authenticator from '../Authenticator';
import QRCodeComponent from '../../../ux/QRCodeComponent';
import { STATUS_TYPE } from '../../../ux/ux';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class SmartphoneMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isEnrolling: false,
            qrData: ''
        };
    }

    authenticationInfoChanged() {
        return this.state.isEnrolling;
    }

    authenticationInfoSavable() {
        return false;
    }

    doEnroll() {
        return this.props.doEnrollWithBeginProcess()
            .then((response) => {
                if (response.status === 'MORE_DATA') {
                    this.scheduleAutoSubmit();

                    if (response.qrdata) {
                        return new Promise((resolve) => {
                            this.setState((state) => {
                                return {qrData: response.qrdata,
                                        isEnrolling: true
                                };
                            }, () => resolve(response));
                        });
                    }
                    else {
                        return Promise.resolve(response);
                    }
                }
                else if (response.status === 'FAILED') {
                    this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                    return new Promise((resolve) => {
                        this.setState((state) => {
                            return {qrData: response.qrdata,
                                    isEnrolling: false
                            };
                        }, () => resolve(response));
                    });
                }
                else {
                    throw response.msg;
                }
            });
    };

    handleQRClick = () => {
        this.doEnroll();
    };

    scheduleAutoSubmit() {
        this.props.setAsyncEnroll((response) => {
            // guaranteed to have response.status !== MORE_DATA
            if (response.status === 'FAILED') {
                this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                return new Promise((resolve) => {
                    this.setState((state) => {
                        return {qrData: response.qrdata,
                                isEnrolling: false
                        };
                    }, () => resolve(response));
                });
            }
            else if (response.status === 'OK') {
                this.props.showStatus(response.msg, STATUS_TYPE.OK);
            }
            else {
                throw response.msg;
            }
        });
    }

    render() {
        const qrElement = this.state.qrData ? <QRCodeComponent text={this.state.qrData} /> : null;
        return (
            <Authenticator
                description={`The Smartphone method allows authentication with your smartphone.
It is an out-of-band authentication. The NetIQ Advanced Authentication application
sends a push message to your smartphone, which you can "Accept" or "Reject."
Installing the NetIQ Advanced Authentication mobile app (AdvAuth app)
on your smartphone is required.`}
                {...this.props}
            >
                <div className="description">
                    To enroll, get a QR code then scan it using the AdvAuth mobile app:
                </div>
                <div className="authenticator-section">
                    <button type="button" className="ias-button" onClick={this.handleQRClick}>Get QR Code</button>
                </div>

                {/* TODO: Display the QR Code and wait by calling doEnroll continuously */}
                {qrElement}

                <div className="description">
                    <ul>
                        <li>As a backup method, the AdvAuth mobile app provides an OTP
                            code if internet connection is not available on your smartphone.
                        </li>
                    </ul>
                </div>
                <TestAuthenticatorButton {...this.props.test} />
            </Authenticator>
        );
    }
}

export default SmartphoneMethod;
