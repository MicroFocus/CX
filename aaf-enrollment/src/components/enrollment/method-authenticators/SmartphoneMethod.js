import React from 'react';
import Authenticator from '../Authenticator';
import QRCodeComponent from '../../../ux/QRCodeComponent';
import {STATUS_TYPE} from '../../../ux/ux';
import t from '../../../i18n/locale-keys';

class SmartphoneMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isEnrolling: false,
            qrData: ''
        };

        // If offline authentication is disabled, we will hide the part of the description mentioning it.
        this.disableOffline = this.props.policies.smartphoneMethod.data.disableOffline;
    }

    authenticationInfoChanged() {
        return this.state.isEnrolling;
    }

    authenticationInfoSavable() {
        return false;
    }

    handleQRClick = () => {
        this.setState({ isEnrolling: true });

        this.props.doEnrollWithBeginProcess()
            .then((response) => {
                if (response.status === 'MORE_DATA') {
                    this.scheduleAutoSubmit();
                    this.setState({ qrData: response.qrdata });
                }
                else {
                    this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                }
            });
    };

    scheduleAutoSubmit = () => {
        this.props.setAsyncEnroll((response) => {
            if (response.status === 'OK') {
                // Unlike other methods with async enrollment, the Smartphone enrollment only returns an empty string
                // on success instead of the expected 'Enrollment is complete' message.
                // To avoid this problem, let's set a success message if string is blank.
                const message = response.msg || t.enrollmentComplete();
                this.props.showStatus(message, STATUS_TYPE.OK);
            }
            else {
                this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                this.setState({ isEnrolling: false });
            }
        });
    };

    render() {
        const qrElement = this.state.qrData ? <QRCodeComponent text={this.state.qrData} /> : null;

        let offlineDescription = null;
        if (!this.disableOffline) {
            offlineDescription = (
                <div className="description">
                    <ul>
                        <li>{t.smartphoneBackupMethodInfo()}
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <Authenticator
                description={t.smartphoneMethodDescription()}
                {...this.props}
            >
                <div className="description">
                    {t.smartphoneEnrollInstructions()}
                </div>
                <div className="authenticator-section">
                    <button
                        className="ias-button"
                        disabled={this.state.isEnrolling || this.props.readonlyMode}
                        id="QR_Code_Button"
                        onClick={this.handleQRClick}
                        type="button"
                    >
                        {t.buttonGetQRCode()}
                    </button>
                </div>

                {qrElement}
                {offlineDescription}
            </Authenticator>
        );
    }
}

export default SmartphoneMethod;
