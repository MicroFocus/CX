import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TextField from '../../TextField';
import t from '../../../i18n/locale-keys';

class EmailOTPMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {isEnrolled, data} = props.template;
        let email = '';
        if (isEnrolled && data) {
            email = data.email || '';
        }
        const initialOtherState = {defaultRecipient: null};
        generateFormChangeHandler(this, {email}, initialOtherState);

        this.props.getDefaultRecipient(this.props.template.methodId).then(({defaultRecipient}) => {
            this.setState({defaultRecipient});
        });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return !this.props.template.isEnrolled || this.authenticationInfoChanged();
    }

    finishEnroll() {
        const {email} = this.state.form;

        if (!email.length && !this.state.defaultRecipient) {
            return Promise.reject(this.props.policies.emailOTPMethod.data.enrollNoRecipientMsg);
        }

        const formData = email.length ? {email} : null;
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

    renderOverrideElements() {
        return (
            <React.Fragment>
                <div>
                    <label>{t.emailOverride()}</label>
                </div>
                <TextField
                    disabled={this.props.readonlyMode}
                    id="Email_Input_Field"
                    label={t.emailOverrideLabel()}
                    name="email"
                    value={this.state.form.email}
                    onChange={this.handleChange}
                />
            </React.Fragment>
        );
    }

    render() {
        const userEmail = this.state.defaultRecipient || t.recipientUnknown();
        const overrideElements = this.props.policies.emailOTPMethod.data.allowOverrideRecipient
            ? this.renderOverrideElements() : null;

        return (
            <Authenticator
                description={t.emailOTPMethodDescription()}
                {...this.props}
            >
                <div>
                    <label>{t.emailPossessive()}</label>
                    <span className="directory-data">{userEmail}</span>
                </div>
                <div>
                    <label>{t.directoryFrom()}</label>
                </div>
                {overrideElements}
            </Authenticator>
        );
    }
}

export default EmailOTPMethod;
