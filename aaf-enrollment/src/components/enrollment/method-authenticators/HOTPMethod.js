import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {Accordion} from '../../../ux/ux';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TextField from '../../TextField';
import t from '../../../i18n/locale-keys';

const HOTP_SYNC_NUM_VALUES = 3;

class HOTPMethod extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log(props.template);

        const initialFormState = {
            serial: '',
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
            }
            else {
                throw response.msg;
            }
        });
    }

    getSyncTokenInputs() {
        const syncTokenInputs = [];

        for (let id = 1; id <= HOTP_SYNC_NUM_VALUES; id++) {
            syncTokenInputs.push(
                <TextField
                    autoComplete="off"
                    disabled={this.props.readonlyMode}
                    id={`HOTP${id}_Input_Field`}
                    key={`hotp-input-${id}`}
                    name={`hotp${id}`}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    placeholder={t.hotpValue(id)}
                    value={this.state.form[`hotp${id}`]}
                />
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
                            <label>{t.oathSerialNumber()}<span>{data.serial}</span></label>
                        </div>
                    ));
                }

                if (data.tokenPublicId) {
                    firstEnrollInputs.push((
                        <div className="ias-input-container" key="token-public-id">
                            <label>{t.hotpYubikeyId()}<span>{data.tokenPublicId}</span></label>
                        </div>
                    ));
                }
            }
        }
        else {
            firstEnrollInputs = (
                <React.Fragment>
                    <TextField
                        disabled={this.props.readonlyMode}
                        id="Token_Serial_Field"
                        label={t.oathSerial()}
                        name="serial"
                        onChange={this.handleChange}
                        value={this.state.form.serial}
                    />
                    <TextField
                        disabled={this.props.readonlyMode}
                        id="YubiKey_ID_Field"
                        label={t.hotpYubikeyId()}
                        name="tokenPublicId"
                        onChange={this.handleChange}
                        value={this.state.form.tokenPublicId}
                    />
                    <ShowHidePassword
                        disabled={this.props.readonlyMode}
                        id="Secret_Input_Field"
                        name="secret"
                        onChange={this.handleChange}
                        label={t.hotpSecret()}
                        value={this.state.form.secret}
                    />
                </React.Fragment>
            );
        }
        return (
            <Authenticator
                description={t.hotpMethodDescription(HOTP_SYNC_NUM_VALUES)}
                {...this.props}
            >
                {firstEnrollInputs}
                <Accordion startOpen title={t.hotpSynchronize()}>
                    <p>{t.hotpInstructions(HOTP_SYNC_NUM_VALUES)}</p>
                    {syncTokenInputs}
                </Accordion>
            </Authenticator>
        );
    }
}

export default HOTPMethod;
