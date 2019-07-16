import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TextField from '../../TextField';
import t from '../../../i18n/locale-keys';

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
        return !this.props.template.isEnrolled || this.authenticationInfoChanged();
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

    renderOverrideElements() {
        return (
            <React.Fragment>
                <div>
                    <label>{t.mobilePhoneOverride()}</label>
                </div>
                <TextField
                    disabled={this.props.readonlyMode}
                    id="Mobile_Input_Field"
                    label={t.mobilePhoneOverrideLabel()}
                    name="mobilePhone"
                    onChange={this.handleChange}
                    value={this.state.form.mobilePhone}
                />
            </React.Fragment>
        );
    }

    render() {
        const userMobilePhone = this.state.defaultRecipient || t.recipientUnknown();
        const overrideElements = this.props.policies.SMSOTPMethod.data.allowOverrideRecipient
            ? this.renderOverrideElements() : null;

        return (
            <Authenticator
                description={t.smsOtpMethodDescription()}
                {...this.props}
            >
                <div>
                    <label>{t.mobilePhonePosessive()}</label>
                    <span className="directory-data">{userMobilePhone}</span>
                </div>
                <div>
                    <label>{t.directoryFrom()}</label>
                </div>
                {overrideElements}
            </Authenticator>
        );
    }
}

export default SMSOTPMethod;
