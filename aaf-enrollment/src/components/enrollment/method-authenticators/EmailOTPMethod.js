import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class EmailOTPMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {isEnrolled, data} = props.template;
        let email = '';
        if (isEnrolled && data) {
            email = data.email || '';
        }
        const initialOtherState = { defaultRecipient: null };
        generateFormChangeHandler(this, { email }, initialOtherState);

        this.props.getDefaultRecipient(this.props.template.methodId).then(({defaultRecipient}) => {
            this.setState({defaultRecipient});
        });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return true;
    }

    finishEnroll() {
        const {email} = this.state.form;

        if (!email.length && !this.state.defaultRecipient) {
            return Promise.reject(this.props.policies.emailOTPMethod.data.enrollNoRecipientMsg);
        }

        const formData = email.length ? { email } : null;
        return this.props.doEnrollWithBeginProcess(formData)
            .then((response) => {
                if (response.status !== 'FAILED') {
                    return Promise.resolve(response);
                }
                else {
                    throw response.msg;
                }
            });
    };

    render() {
        const userEmail = this.state.defaultRecipient || 'unknown';

        return (
            <Authenticator
                description="The Email OTP method sends an email with a One-time Password (OTP).
                Use the OTP to authenticate within a specified timeframe."
                {...this.props}
            >
                <div className="override">
                    <div>
                        <label>Your email</label>
                        <span className="directory-data">{userEmail}</span>
                    </div>
                    <div>
                        <label>(from corporate directory)</label>
                    </div>
                    <div>
                        <label>To override for this method, enter Override Email</label>
                    </div>
                </div>
                <div className="ias-input-container">
                    <label htmlFor="Email_Input_Field">Override Email</label>
                    <input id="Email_Input_Field"
                           name="email"
                           value={this.state.form.email}
                           type="text"
                           onChange={this.handleChange}
                    />
                    <TestAuthenticatorButton {...this.props.test} />
                </div>

                {/* TODO: Remove (optional) when !default_recipient, omit email when !allow_override_recipient*/}
            </Authenticator>
        );
    }
}

export default EmailOTPMethod;
