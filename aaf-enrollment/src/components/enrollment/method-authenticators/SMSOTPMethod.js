import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class SMSOTPMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {isEnrolled, data} = props.template;
        let mobilePhone = '';
        if (isEnrolled && data) {
            mobilePhone = data.mobilePhone || '';
        }
        const initialOtherState = { defaultRecipient: null };
        generateFormChangeHandler(this, { mobilePhone }, initialOtherState);

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
        const {mobilePhone} = this.state.form;

        if (!mobilePhone.length && !this.state.defaultRecipient) {
            return Promise.reject(this.props.policies.SMSOTPMethod.data.enrollNoRecipientMsg);
        }

        const formData = mobilePhone.length ? { mobilePhone } : null;
        return this.props.doEnrollWithBeginProcess(formData)
            .then((response) => {
                if (response.status !== 'FAILED') {
                    return Promise.resolve(response);
                }
                else {
                    throw response.msg;
                }
            });
    }

    render() {
        const userMobilePhone = this.state.defaultRecipient || 'unknown';

        return (
            <Authenticator
                description="The SMS One-time Password (OTP) method sends a text message to your mobile phone including
                             a OTP. The OTP has to be used within a specified timeframe."
                {...this.props}
            >
                <div className="override">
                    <div>
                        <label>Your mobile phone</label>
                        <span className="directory-data">{userMobilePhone}</span>
                    </div>
                    <div>
                        <label>(from corporate directory)</label>
                    </div>
                    <div>
                        <label>To override for this method, enter Override Mobile Phone</label>
                    </div>
                </div>
                <div className="ias-input-container">
                    <label htmlFor="Mobile_Phone_Field">Override Mobile Phone</label>
                    <input id="Mobile_Input_Field"
                           name="mobilePhone"
                           value={this.state.form.mobilePhone}
                           type="text"
                           onChange={this.handleChange}
                    />
                    <TestAuthenticatorButton {...this.props.test} />
                </div>
                {/* TODO: Remove (optional) when !default_recipient, omit phone number when !allow_override_recipient*/}
            </Authenticator>
        );
    }
}

export default SMSOTPMethod;
