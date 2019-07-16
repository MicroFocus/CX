import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import t from '../../../i18n/locale-keys';

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
            return Promise.reject(t.bankIdNoId());
        }
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    render() {
        return (
            <Authenticator
                description={t.bankIdMethodDescription()}
                {...this.props}
            >
                <ShowHidePassword
                    disabled={this.props.readonlyMode}
                    id="PersonalId_Input_Field"
                    name="personalId"
                    onChange={this.handleChange}
                    placeholder={t.bankIdId()}
                    value={this.state.form.personalId}
                />
            </Authenticator>
        );
    }
}

export default BankIdMethod;
