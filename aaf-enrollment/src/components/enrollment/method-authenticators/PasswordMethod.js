import React from 'react';
import ShowHidePassword from '../../ShowHidePassword';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import t from '../../../i18n/locale-keys';

class PasswordMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        generateFormChangeHandler(this, {
            password: '',
            confirmation: ''
        });
    }

    finishEnroll() {
        const {password, confirmation} = this.state.form;
        if (password === confirmation) {
            return this.props.doEnrollWithBeginProcess({password})
            .then((response) => {
                if (response.status !== 'FAILED') {
                    return Promise.resolve(response);
                }
                else {
                    throw response.msg;
                }
            });
        }
        else {
            return Promise.reject(t.passwordsNotMatching());
        }
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    render() {
        const label = (this.props.template.isEnrolled && !this.props.readonlyMode) ? t.passwordChange() : null;

        return (
            <Authenticator
                description={t.passwordMethodDescription()}
                {...this.props}
            >
                <ShowHidePassword
                    disabled={this.props.readonlyMode}
                    id="Password_Input_Field"
                    label={label}
                    name="password"
                    onChange={this.handleChange}
                    placeholder={t.passwordLabel()}
                    value={this.state.form.password}
                />
                <ShowHidePassword
                    disabled={this.props.readonlyMode}
                    id="Confirmation_Input_Field"
                    name="confirmation"
                    onChange={this.handleChange}
                    placeholder={t.passwordConfirmationLabel()}
                    value={this.state.form.confirmation}
                />
            </Authenticator>
        );
    }
}

export default PasswordMethod;
