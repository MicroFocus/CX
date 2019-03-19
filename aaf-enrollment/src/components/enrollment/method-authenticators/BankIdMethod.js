import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class BankIdMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        generateFormChangeHandler(this, {
            personalId: ''
        });
    }

    finishEnroll() {
        const {form} = this.state;
        if (form.personalId !== '') {
            return this.props.doEnrollWithBeginProcess(form)
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
            return Promise.reject('No personal id entered.');
        }
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    render() {
        return (
            <Authenticator
                description="BankID is a highly trusted digital identification service for Swedish citizens.
          With access to Swedish BankID from Nets, you can authenticate any person online,
          carry out secure transactions,
          establish and maintain good customer relations, and enter into and sign legally binding agreements."
                {...this.props}
            >
                <ShowHidePassword
                        id="PersonalId_Input_Field"
                        name="personalId"
                        onChange={this.handleChange}
                        placeholder="Personal ID (SSN)"
                        value={this.state.form.personalId}
                >
                    <TestAuthenticatorButton {...this.props.test} />
                </ShowHidePassword>
            </Authenticator>
        );
    }
}

export default BankIdMethod;
