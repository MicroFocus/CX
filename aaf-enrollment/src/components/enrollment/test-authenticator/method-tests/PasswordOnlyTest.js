import React from 'react';
import ShowHidePassword from '../../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../../utils/form-handler';
import {methodIds} from '../../../../data/MethodData';
import t from '../../../../i18n/locale-keys';

// Test several methods that only include a Password field. This includes:
// - Single-step doLogon methods: EMERG_PASSWORD, HOTP, PASSWORD, RADIUS, TOTP
// - Double-step doLogon methods (first doLogon sends OTP): EMAIL_OTP, SMS_OTP, VOICE_OTP
const doubleStepLogons = [methodIds.EMAIL_OTP, methodIds.SMS_OTP, methodIds.VOICE_OTP];

class PasswordOnlyTest extends React.PureComponent {
    constructor(props) {
        super(props);

        generateFormChangeHandler(this, {
            answer: ''
        });

        if (doubleStepLogons.indexOf(props.template.methodId) !== -1) {
            this.props.doTestLogon(null);
        }
    }

    render() {
        return (
            <React.Fragment>
                <ShowHidePassword
                    autoFocus
                    name="answer"
                    onChange={this.handleChange}
                    placeholder={t.passwordLabel()}
                    value={this.state.form.answer}
                />
            </React.Fragment>
        );
    }
}

export default PasswordOnlyTest;
