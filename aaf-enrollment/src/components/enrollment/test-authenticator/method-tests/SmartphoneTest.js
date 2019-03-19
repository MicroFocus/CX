import React from 'react';
import ShowHidePassword from '../../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../../utils/form-handler';

class SmartphoneTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setAsyncLogon(() => {}, true);
        this.props.setTestButtonAvailability(false);
        this.testButtonEnabled = false;

        // TODO: don't show TOTP field if geofencing is enabled
        generateFormChangeHandler(this, {
            totp: ''
        });
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
        return (
            <React.Fragment>
                <p className="description">
                    If your phone does not have a network connection, you can specify the offline OTP that is displayed
                    in the smartphone app in the following field
                </p>
                <ShowHidePassword
                    autoFocus
                    name="totp"
                    onChange={this.handleTotpChange}
                    placeholder="Password"
                    value={this.state.form.totp}
                />
            </React.Fragment>
        );
    }
}

export default SmartphoneTest;
