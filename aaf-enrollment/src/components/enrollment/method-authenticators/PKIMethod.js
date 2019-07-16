import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import {LoadingIndicator, STATUS_TYPE} from '../../../ux/ux';
import moment from 'moment';
import CommonCardHandler from '../../../api/devices/common-card-devices.api';
import Certificate from 'pkijs/src/Certificate';
import {fromBER} from 'asn1js';
import {pkiGenerateKeypair, pkiGetCertificates} from '../../../api/devices/pki-device.api';
import t from '../../../i18n/locale-keys';

const KEYPAIR_ID_GENERATE = 'GENERATE';
const X509_COMMON_NAME_KEY = '2.5.4.3';

class PKIMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.cardUid = null;
        this.certs = null;
        this.pkiHandler = new CommonCardHandler(CommonCardHandler.PKI_SERVICE_URL, props.showStatus,
            props.registerPromise);

        generateFormChangeHandler(this, {
            keypairId: null,
            pin: ''
        }, {
            generating: false,  // True if UI should show a "Generating" animation
            gettingCertificates: false,
            parsedCerts: null
        });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return !!this.certs;
    }

    componentWillUnmount() {
        this.pkiHandler.abortCardPromise();
    }

    finishEnroll() {
        // The user can enroll via generating keypair or selecting a certificate. The former requires we ask Device
        // Service to generate the keypair so we can submit it; with the latter we can just submit the certificate
        const {form: {
            keypairId, pin
        }} = this.state;
        const cardUid = this.cardUid;

        if (keypairId === null) {
            return Promise.reject(t.pkiEnrollFailed());
        }
        else if (keypairId === KEYPAIR_ID_GENERATE) {
            this.setState({generating: true});
            return this.props.registerPromise(
                    pkiGenerateKeypair({pin})
                )
                .then((data) => {
                    const enrollData = {
                        cardUid,
                        exponent: data.exponent,
                        keypairId: data.keypairid,
                        modulus: data.modulus
                    };
                    return this.props.doEnrollWithBeginProcess(enrollData);
                })
                .then((response) => {
                    if (response.status !== 'FAILED') {
                        return Promise.resolve(response);
                    }
                    else {
                        throw response.msg;
                    }
                })
                // We only need to reset "generating" animation if user will stay on the page. Otherwise we don't
                // reset it because this component will be unmounted. (We would also get a memory leak.)
                .catch((error) => {
                    this.setState({generating: false});
                    throw error;
                });
        }
        else {
            let certificate = {};

            // Get the certificate from the keypairId
            for (let index = 0; index < this.certs.length; index++) {
                if (this.certs[index].keypairId === keypairId) {
                    certificate = this.certs[index];
                    break;
                }
            }

            const enrollData = {
                cardCert: certificate.certificate,
                cardUid,
                keypairId,
                subject: certificate.subject
            };
            return this.props.doEnrollWithBeginProcess(enrollData)
                .then((response) => {
                    if (response.status !== 'FAILED') {
                        return Promise.resolve(response);
                    }
                    else {
                        throw response.msg;
                    }
                });
        }
    }

    getCertificates = () => {
        this.setState({
            dataDirty: true,
            gettingCertificates: true
        });
        this.pkiHandler.getStatus({
            onCard: ({cardUid}) => {
                this.cardUid = cardUid;

                this.props.registerPromise(
                    pkiGetCertificates()
                ).then(({certificates}) => {
                    // Use camelcase in data from server to avoid confusion in code
                    certificates.forEach((certificate) => {
                        certificate.keypairId = certificate.keypairid;
                        delete certificate.keypairid;
                    });

                    this.certs = certificates;
                    this.props.showStatus(t.pkiInstructions(),
                        STATUS_TYPE.INFO);

                    const keypairId = (certificates.length ? certificates[0].keypairId : 'GENERATE');

                    this.setState({
                        form: {...this.state.form, keypairId},
                        gettingCertificates: false,
                        parsedCerts: this.parseCerts(certificates)
                    });
                }).catch((error) => {
                    this.setState({gettingCertificates: false});
                    this.props.showStatus(error, STATUS_TYPE.ERROR);
                });
            }
        });
    };

    parseCerts(certDataArray) {
        const parsedCerts = certDataArray.map(certData => {
            // Defaults in case there is an error or no subject is found
            let commonName = '';
            let notValidAfter = '';

            try {
                const hexCertificateString = certData.certificate;
                const typedArray = new Uint8Array(hexCertificateString.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));
                const asn1 = fromBER(typedArray.buffer);
                const certificate = new Certificate({ schema: asn1.result });
                notValidAfter = certificate.notAfter.value;

                // Search the subject for the common name of the certificate
                const subjectAttributes = certificate.subject.typesAndValues;
                for (let attributeIndex = 0; attributeIndex < subjectAttributes.length; attributeIndex++) {
                    const attribute = subjectAttributes[attributeIndex];
                    if (attribute.type === X509_COMMON_NAME_KEY) {
                        commonName = attribute.value.valueBlock.value;
                        break;
                    }
                }
            }
            catch (error) {
                console.error('Error parsing cert:', error);
            }

            return {
                keypairId: certData.keypairId,
                subjectCn: commonName,
                notValidAfter
            };
        });

        return parsedCerts;
    };

    renderEnrollElements() {
        const certOptions = this.state.parsedCerts.map((parsedCert) => {
            const date = moment(parsedCert.notValidAfter).format('ll');
            const label = t.pkiCertExpiration(parsedCert.subjectCn, date);
            return <option key={parsedCert.keypairId} value={parsedCert.keypairId}>{label}</option>;
        });

        let PINElement = null;
        if (this.state.form.keypairId === KEYPAIR_ID_GENERATE) {
            PINElement = (
                <div className="ias-input-container">
                    <ShowHidePassword
                        disabled={this.props.readonlyMode}
                        id="card_pin"
                        name="pin"
                        onChange={this.handleChange}
                        placeholder={t.pkiPin()}
                        value={this.state.form.pin}
                    />
                </div>
            );
        }

        const keypairOption = this.props.policies.PKIMethod.data.allowKeypair
            ? <option key="generate" value={KEYPAIR_ID_GENERATE}>{t.pkiGenerateKeypair()}</option> : null;

        return (
            <React.Fragment>
                <div className="ias-input-container">
                    <label htmlFor="PKI_Key_Select">{t.pkiKey()}
                        <select
                            id="PKI_Key_Select"
                            name="keypairId"
                            onChange={this.handleChange}
                            value={this.state.form.keypairId}
                        >
                            {certOptions}
                            {keypairOption}
                        </select>
                    </label>
                </div>
                {PINElement}
            </React.Fragment>
        );
    }

    render() {
        const {gettingCertificates, generating, parsedCerts} = this.state;
        const enrollElements = parsedCerts ? this.renderEnrollElements() : null;
        const loadingElement = generating ? <LoadingIndicator message={t.generating()} /> : null;

        return (
            <Authenticator
                description={t.pkiMethodDescription()}
                {...this.props}
            >
                {enrollElements}
                <button
                    className="ias-button"
                    disabled={gettingCertificates || !!parsedCerts || this.props.readonlyMode}
                    id="Get_Certificates_Button"
                    onClick={this.getCertificates}
                    type="button"
                >
                    {t.pkiGetCertificates()}
                </button>
                {loadingElement}
            </Authenticator>
        );
    }
}

export default PKIMethod;
