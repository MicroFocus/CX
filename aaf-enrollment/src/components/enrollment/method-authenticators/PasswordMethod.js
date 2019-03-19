import React from 'react';
import ShowHidePassword from '../../ShowHidePassword';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

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
            return Promise.reject('Passwords do not match');
        }
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    render() {
        return (
            <Authenticator
                description="The Password method is a password stored in
          NetIQ Advanced Authentication not connected to your corporate directory.
          This can be a PIN or a simple password."
                {...this.props}
            >
                <ShowHidePassword
                    id="Password_Input_Field"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                    value={this.state.form.password}
                />
                <ShowHidePassword
                    id="Confirmation_Input_Field"
                    name="confirmation"
                    onChange={this.handleChange}
                    placeholder="Confirmation"
                    value={this.state.form.confirmation}
                >
                    <TestAuthenticatorButton {...this.props.test} />
                </ShowHidePassword>
            </Authenticator>
        );
    }
}

export default PasswordMethod;
