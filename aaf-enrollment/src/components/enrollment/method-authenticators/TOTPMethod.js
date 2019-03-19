import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {Accordion} from '../../../ux/ux';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import QRCodeComponent from '../../../ux/QRCodeComponent';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class TOTPMethod extends React.PureComponent {
    constructor(props) {
        super(props);

    const secret = '';
    const period = 30;

    generateFormChangeHandler(this, { tokenSerial: '', otp: '', secret, period },
        {
          data: {
            isBase32Secret: false,
          },
          qrdata: ''
      });
  }

  componentDidMount() {
    console.log('OnDidMount');
    if (!this.props.template.isEnrolled) {
      this.askNewSecret(false);
    }
  }

  askNewSecret(isBase32Secret) {
    return this.props.getTotpQrCode(isBase32Secret)
        .then(response => {
          console.log('fetching: ', response);
          if (this.props.isEdit) {
            // we don't require this, since it always fetch from policy.
              //delete data.otp_format;
              //elete data.period;
          }

          this.setState((state) => {
            const newFormState = {...state.form};
            newFormState['secret'] = response.secret;
            newFormState['period'] = response.period;

            const otherState = {
              data: response,
              qrdata: response.qrdata
            };

            return {
                ...otherState,
                form: newFormState,
                dataDirty: true
            };
        });
        }).catch((error) => {
          console.log('Error', error);
        });
  }

  handleCheckboxClick = (event) => {
    const value = event.target.value;
    this.handleChange(event);
    if (!this.props.template.isEnrolled) {
      this.askNewSecret(value);
    }
  }

  finishEnroll() {
    const {secret, period, tokenSerial, otp, isBase32Secret} = this.state.form;

    let formData = null;
    if (tokenSerial !== '') {
      formData = {tokenSerial, otp};
    } else {
      formData = {secret, period, isBase32Secret};
    }

    return this.props.doEnrollWithBeginProcess(formData).then(response => {
          if (response.status !== 'FAILED') {
              return Promise.resolve(response);
          } else {
              return Promise.reject('No secret found');
          }
      });
  }

  authenticationInfoChanged() {
    return this.state.dataDirty;
  }

  renderEnrollContent() {
    const qrElement = this.state.qrdata ? <QRCodeComponent key={this.state.qrdata} text={this.state.qrdata} /> : null;

    return (<React.Fragment>
              {/* <Accordion title="OATH Token Serial Number">
          <div className="ias-input-container">
            <label htmlFor="Token_Serial_Field">OATH Token Serial Number</label>
            <input
              id="Token_Serial_Field"
              name="tokenSerial"
              value={this.state.form.tokenSerial}
              onChange={this.handleChange}
              type="text"
              />
          </div>
          <ShowHidePassword
            id="Token_Verify_Field"
            name="otp"
            value={this.state.form.otp}
            onChange={this.handleChange}
            label="One-time Password (OTP)"
          />
        </Accordion> */}
        <Accordion title="Manual TOTP">
          <ShowHidePassword
            id="Secret_Field"
            label="Secret"
            name="secret"
            type="text"
            onChange={this.handleChange}
            value={this.state.form.secret}
          />
          <div className="ias-input-container ias-inline">
            <div>
              <input
              type="checkbox"
              value={this.state.form.isBase32Secret}
              name="isBase32Secret"
              onChange={this.handleCheckboxClick}
              id="checkbox1"
              />
              <label className="label-large-dark" htmlFor="checkbox1">Use Google Authenticator format (Base32)</label>
            </div>
          </div>
          <div className="ias-input-container">
            <label htmlFor="Period_Field">Period</label>
            <input
                id="Period_Field"
                type="text"
                name="period"
                onChange={this.handleChange}
                value={this.state.form.period}
            />
          </div>
        </Accordion>
        {qrElement}
            </React.Fragment>);
  }

  render() {
    const isEnrolled = this.props.template.isEnrolled;
    const enrollElements = !isEnrolled ? this.renderEnrollContent() : null;

    return (
      <Authenticator
        description="The Time-based One-time Password (TOTP) method generates an OTP through a hardware OTP token
            or the NetIQ Advanced Authentication mobile app. Once generated, the OTP must be used within a specified
            timeframe."
        {...this.props}
      >
        <div className="description">
          Enroll this method using one of the following:
          <ul>
            <li>
              Scan the QR code using a smartphone app.
            </li>
            <li>
              Specify a Manual TOTP by adding Secret and Period values.
            </li>
          </ul>
        </div>
        {enrollElements}
        <TestAuthenticatorButton {...this.props.test} />
      </Authenticator>
    );
  }
}

export default TOTPMethod;
