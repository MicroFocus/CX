import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {Accordion} from '../../../ux/ux';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

const HOTP_SYNC_NUM_VALUES = 3;

class HOTPMethod extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log(props.template);

        const initialFormState = {
            // TODO: Right now the server doesn't accept the tokenSerial field. Add back once server supports.
            // tokenSerial: '',
            tokenPublicId: '',
            secret: ''
        };

        for (let id = 1; id <= HOTP_SYNC_NUM_VALUES; id++) {
            initialFormState[`hotp${id}`] = '';
        }

        generateFormChangeHandler(this, initialFormState);
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    finishEnroll() {
        const enrollData = {};

        Object.keys(this.state.form).forEach((key) => {
            const value = this.state.form[key];
            if (value.length) {
                enrollData[key] = value;
            }
        });

        const {isEnrolled} = this.props.template;
        return this.props.doEnrollWithBeginProcess(enrollData, false, isEnrolled).then(response => {
            if (response.status !== 'FAILED') {
                return Promise.resolve(response);
            } else {
                throw response.msg;
            }
        });
    }

    getSyncTokenInputs() {
        const syncTokenInputs = [];

        for (let id = 1; id <= HOTP_SYNC_NUM_VALUES; id++) {
            syncTokenInputs.push(
                <div className="ias-input-container" key={`hotp-input-${id}`}>
                    <input
                        autoComplete="off"
                        id={`HOTP${id}_Input_Field`}
                        name={`hotp${id}`}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        placeholder={'Value ' + id}
                        type="text"
                        value={this.state.form[`hotp${id}`]}
                    />
                </div>
            );
        }

        return syncTokenInputs;
    }

    // Ignore "enter" keypress on HOTP inputs. When using Yubikey token for this method to auto-fill HOTP inputs,
    // it pushes "enter", which would otherwise submit the form prematurely.
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    render() {
        const syncTokenInputs = this.getSyncTokenInputs();

        const {isEnrolled, data} = this.props.template;

        let firstEnrollInputs = null;
        if (isEnrolled) {
            if (data) {
                firstEnrollInputs = [];
                if (data.serial) {
                    firstEnrollInputs.push((
                        <div className="ias-input-container" key="serial">
                            <label>OATH Token Serial<span>{data.serial}</span></label>
                        </div>
                    ));
                }

                if (data.tokenPublicId) {
                    firstEnrollInputs.push((
                        <div className="ias-input-container" key="token-public-id">
                            <label>YubiKey Token ID<span>{data.tokenPublicId}</span></label>
                        </div>
                    ));
                }
            }
        }
        else {
            firstEnrollInputs = (
                <React.Fragment>
                    {/*<div className="ias-input-container">
                        <label htmlFor="Token_Serial_Field">OATH Token Serial</label>
                        <input
                            id="Token_Serial_Field"
                            name="tokenSerial"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.form.tokenSerial}
                        />
                    </div>*/}
                    <div className="ias-input-container">
                        <label htmlFor="YubiKey_ID_Field">YubiKey Token ID</label>
                        <input
                            id="YubiKey_ID_Field"
                            name="tokenPublicId"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.form.tokenPublicId}
                        />
                    </div>
                    <ShowHidePassword
                        id="Secret_Input_Field"
                        name="secret"
                        onChange={this.handleChange}
                        label="Secret (if you know)"
                        value={this.state.form.secret}
                    />
                </React.Fragment>
            );
        }
        return (
            <Authenticator
                description={`The HMAC-based One-time Password (HOTP) method uses a counter that is in sync with your
                    device and the server. Specify an OATH token serial number, usually provided by your system
                    administrator. If the token counter is out of sync, synchronize it by specifying the
                    ${HOTP_SYNC_NUM_VALUES} HOTP below.`}
                {...this.props}
            >
                {firstEnrollInputs}
                <div className="ias-input-container">
                    <TestAuthenticatorButton {...this.props.test} />
                </div>
                <Accordion startOpen={!isEnrolled} title="Synchronize the token counter">
                    <p> Generate and specify {HOTP_SYNC_NUM_VALUES} consecutive HOTP values</p>
                    {syncTokenInputs}
                </Accordion>
            </Authenticator>
        );
    }
}

export default HOTPMethod;
