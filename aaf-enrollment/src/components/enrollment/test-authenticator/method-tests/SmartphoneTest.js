import React from 'react';
import ShowHidePassword from '../../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../../utils/form-handler';
import t from '../../../../i18n/locale-keys';

class SmartphoneTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setAsyncLogon((response) => {
            // Smartphone auth uses 'STOP' instead of 'FAILED' when authentication is rejected, so handle it properly
            // Because no other methods use 'STOP', we aren't putting this code into TestAuthenticator
            if (response.status === 'STOP') {
                this.props.markTestComplete(false, response.msg);
            }
        }, true);
        this.props.setTestButtonAvailability(false);
        this.testButtonEnabled = false;

        // If offline authentication is disabled, we will hide the TOTP field.
        // Note that during login, the TOTP field is also hidden for events with geofencing turned on. We do
        // not need to do this for testing the authenticator since the test does not correspond to any event.
        this.disableOffline = this.props.policies.smartphoneMethod.data.disableOffline;
        if (!this.disableOffline) {
            generateFormChangeHandler(this, {
                totp: ''
            });
        }
    }

    // Keep the Test button disabled until the user begins typing in the TOTP field
    handleTotpChange = (event) => {
        if (this.testButtonEnabled === false) {
            this.testButtonEnabled = true;
            this.props.setTestButtonAvailability(true);
        }

        this.handleChange(event);
    };

    render() {
        if (this.disableOffline) {
            return null;
        }

        return (
            <React.Fragment>
                <p className="description">
                    {t.smartphoneBackupMethodInstructions()}
                </p>
                <ShowHidePassword
                    autoFocus
                    name="totp"
                    onChange={this.handleTotpChange}
                    placeholder={t.passwordLabel()}
                    value={this.state.form.totp}
                />
            </React.Fragment>
        );
    }
}

export default SmartphoneTest;
