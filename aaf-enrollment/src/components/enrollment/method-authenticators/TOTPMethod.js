import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {Accordion} from '../../../ux/ux';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import QRCodeComponent from '../../../ux/QRCodeComponent';
import TextField from '../../TextField';
import t from '../../../i18n/locale-keys';

class TOTPMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const policy = this.props.policies.TOTPMethod;
        const isBase32Secret = policy.data.useKeyUriFormatQr;
        const period = policy.data.otpPeriod;

        const initialFormState = {
            isBase32Secret,
            otp: '',
            period,
            secret: '',
            serial: ''
        };

        generateFormChangeHandler(this, initialFormState, {
            qrdata: '',
            qrsecret: null
        });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    finishEnroll() {
        const {isBase32Secret, otp, period, secret, serial } = this.state.form;
        const {qrsecret} = this.state;

        let formData = null;
        if (serial !== '') {
            formData = {serial, otp};
        }
        else if (qrsecret) {
            formData = {
                isBase32Secret,
                secret: qrsecret
            };
        }
        else {
            formData = {period, secret};
        }

        return this.props.doEnrollWithBeginProcess(formData).then(response => {
            if (response.status !== 'FAILED') {
                return Promise.resolve(response);
            }
            else {
                throw response.msg;
            }
        });
    }

    getNewSecret(isBase32Secret) {
        return this.props.registerPromise(
                this.props.getTotpQrCode(isBase32Secret)
            ).then(response => {
                this.setState((state) => {
                    const {secret, period, qrdata} = response;
                    const newOtherState = {
                        qrdata,
                        qrsecret: secret
                    };
                    const newFormState = {...state.form, period};

                    return {
                        ...newOtherState,
                        form: newFormState,
                        dataDirty: true
                    };
                });
            });
    }

    handleCheckboxClick = (event) => {
        const checked = event.target.checked;
        this.handleChange(event);
        if (this.state.qrdata) {
            this.getNewSecret(checked);
        }
    };

    handleQRClick = () => {
        this.getNewSecret(this.state.form.isBase32Secret);
    };

    renderEnrollElements() {
        const {isEnrolled, data} = this.props.template;

        // If enrolled, return only token serial number, and only when populated
        if (isEnrolled) {
            if (data && data.serial) {
                return (
                    <div className="ias-input-container">
                        <label>{t.oathSerialNumber()}<span>{data.serial}</span></label>
                    </div>
                );
            }

            return null;
        }

        const qrElement = this.state.qrdata ?
            <QRCodeComponent key={this.state.qrdata} text={this.state.qrdata} /> : null;

        let manualEnrollmentSection = null;
        if (this.props.policies.TOTPMethod.data.allowManualEnrollment) {
            manualEnrollmentSection = (
                <Accordion title={t.totpManual()}>
                    <ShowHidePassword
                        disabled={this.props.readonlyMode}
                        id="Secret_Field"
                        name="secret"
                        label={t.secretLabel()}
                        onChange={this.handleChange}
                        value={this.state.form.secret}
                    />
                    <div className="ias-input-container ias-inline">
                        <div>
                            <input
                                checked={this.state.form.isBase32Secret}
                                disabled={this.props.readonlyMode}
                                id="Base32_Secret_Field"
                                name="isBase32Secret"
                                onChange={this.handleCheckboxClick}
                                type="checkbox"
                            />
                            <label htmlFor="Base32_Secret_Field">{t.totpUseBase32()}</label>
                        </div>
                    </div>
                    <TextField
                        disabled={this.props.readonlyMode}
                        id="Period_Field"
                        label={t.totpPeriod()}
                        name="period"
                        onChange={this.handleChange}
                        value={this.state.form.period}
                    />
                </Accordion>
            );
        }

        return (
            <React.Fragment>
                <Accordion title={t.oathToken()}>
                    <TextField
                        disabled={this.props.readonlyMode}
                        id="Token_Serial_Field"
                        label={t.oathSerialNumber()}
                        name="serial"
                        onChange={this.handleChange}
                        value={this.state.form.serial}
                    />
                    <ShowHidePassword
                        disabled={this.props.readonlyMode}
                        id="Token_Verify_Field"
                        name="otp"
                        label={t.oneTimePassword()}
                        onChange={this.handleChange}
                        value={this.state.form.otp}
                    />
                </Accordion>
                <div className="authenticator-section">
                    <button
                        disabled={this.props.readonlyMode}
                        id="QR_Code_Button"
                        type="button"
                        className="ias-button"
                        onClick={this.handleQRClick}
                    >
                        {t.buttonGetQRCode()}
                    </button>
                </div>
                {qrElement}
                {manualEnrollmentSection}
            </React.Fragment>
        );
    }

    render() {
        const isEnrolled = this.props.template.isEnrolled;
        let enrollInstructions = null;
        if (!isEnrolled) {
            const manualOption = this.props.policies.TOTPMethod.data.allowManualEnrollment
                ? <li>{t.totpEnrollOptionsManual()}</li> : null;

            enrollInstructions = (
                <div className="description">
                    {t.totpEnrollOptionsLabel()}
                    <ul>
                        <li>{t.totpEnrollOptionsSerial()}</li>
                        <li>{t.totpEnrollOptionsSmartphone()}</li>
                        {manualOption}
                    </ul>
                </div>
            );
        }

        const enrollElements = this.renderEnrollElements();

        return (
            <Authenticator
                description={t.totpMethodDescription()}
                {...this.props}
            >
                {enrollInstructions}
                {enrollElements}
            </Authenticator>
        );
    }
}

export default TOTPMethod;
