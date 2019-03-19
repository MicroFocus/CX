import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class VoiceMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {isEnrolled, data} = props.template;
        let mobilePhone = '';
        if (isEnrolled && data) {
            mobilePhone = data.mobilePhone || '';
        }
        const initialOtherState = { defaultRecipient: null };
        generateFormChangeHandler(this, {
            mobilePhone,
            pin: ''
        }, initialOtherState);

        this.props.getDefaultRecipient(this.props.template.methodId).then(({defaultRecipient}) => {
            this.setState({defaultRecipient});
        });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    finishEnroll() {
        const {mobilePhone, ...formData} = this.state.form;

        if (!mobilePhone.length && !this.state.defaultRecipient) {
            return Promise.reject(this.props.policies.voiceMethod.data.enrollNoRecipientMsg);
        }

        if (mobilePhone.length) {
            formData.mobilePhone = mobilePhone;
        }

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
                description="The Voice OTP method sends a PIN through voice to your
          mobile phone. Input the PIN mentioned in the voice call followed by
          the hash sign (#)."
                {...this.props}
            >
                <ShowHidePassword id="PIN_Input_Field"
                                  name="pin"
                                  placeholder="PIN"
                                  onChange={this.handleChange}
                                  value={this.state.form.pin}
                />
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
                    <input id="Mobile_Phone_Field"
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

export default VoiceMethod;
