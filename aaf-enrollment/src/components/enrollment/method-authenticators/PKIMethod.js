import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import {LoadingIndicator, STATUS_TYPE} from '../../../ux/ux';
import moment from 'moment';
import CommonCardHandler from '../../../api/commonCardHandler';
import Certificate from 'pkijs/src/Certificate';
import {fromBER} from 'asn1js';
import {pkiGenerateKeypair, pkiGetCertificates} from '../../../api/pki';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

//var Locale = require('../common/locale');
//var _ = Locale._;
//TODO convert this to our localization
const _ = (value) => {
    return value;
};

//var _k = Locale._k;
//TODO: convert this localization file
const _k = (value, value2) => {
    return value + value2;
};

const KEYPAIR_ID_GENERATE = 'GENERATE';
const X509_COMMON_NAME_KEY = '2.5.4.3';

class PKIMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.cardUid = null;
        this.certs = null;
        this.detectingCard = false;
        this.generatingPromise = null;
        this.pkiHandler = new CommonCardHandler(CommonCardHandler.PKI_SERVICE_URL, this.props.showStatus);

        generateFormChangeHandler(this, {
            keypairId: null,
            pin: ''
        }, {
            generating: false,
            parsedCerts: null
        });
    }

    authenticationInfoChanged() {
        return (this.certs !== null);
    }

    componentWillUnmount() {
        if (this.detectingCard) {
            this.pkiHandler.abort();
        }

        if (this.generatingPromise) {
            this.generatingPromise.abort();
        }
    }

    finishEnroll() {
        // The user can enroll via generating keypair or selecting a certificate. The former requires we ask Device
        // Service to generate the keypair so we can submit it; with the latter we can just submit the certificate
        const {form: {
            keypairId, pin
        }} = this.state;
        const cardUid = this.cardUid;

        if (keypairId === null) {
            return Promise.reject('Cannot enroll due to errors');
        }
        else if (keypairId === KEYPAIR_ID_GENERATE) {
            this.setState({generating: true});
            this.generatingPromise = pkiGenerateKeypair({pin});
            return this.generatingPromise
                .finally(() => this.generatingPromise = null)
                .then((data) => {

                    const enrollData = {
                        cardUid,
                        exponent: data.exponent,
                        keypairId: data.keypairid,
                        modulus: data.modulus
                    };
                    return this.props.doEnrollWithBeginProcess(enrollData)
                        .then((response) => {
                            return new Promise((resolve, reject) => {
                                this.setState({generating: false}, () => {
                                    if (response.status !== 'FAILED') {
                                        resolve(response);
                                    }
                                    else {
                                        reject(response.msg);
                                    }
                                });
                            });
                        })
                        .catch((error) => {
                            return new Promise((resolve, reject) => {
                                this.setState({generating: false}, () => {
                                    reject(error);
                                });
                            });
                        });
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
        this.pkiHandler.getStatus({
            onCard: ({cardUid}) => {
                this.detectingCard = false;
                this.cardUid = cardUid;

                pkiGetCertificates().then(({certificates}) => {
                    // Use camelcase in data from server to avoid confusion in code
                    certificates.forEach((certificate) => {
                        certificate.keypairId = certificate.keypairid;
                        delete certificate.keypairid;
                    });

                    this.certs = certificates;
                    this.props.showStatus(_('Use an existing certificate or generate a key pair'),
                        STATUS_TYPE.INFO);

                    const keypairId = (certificates.length ? certificates[0].keypairId : 'GENERATE');

                    this.setState({
                        form: {...this.state.form, keypairId},
                        parsedCerts: this.parseCerts(certificates)
                    });
                }).catch((error) => {
                    this.props.showStatus(error, STATUS_TYPE.ERROR);
                });
            }
        });

        this.detectingCard = true;
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
            const label = parsedCert.subjectCn + ` (Expiry date: ${date})`;
            return <option key={parsedCert.keypairId} value={parsedCert.keypairId}>{label}</option>;
        });

        let PINElement = null;
        if (this.state.form.keypairId === KEYPAIR_ID_GENERATE) {
            PINElement = (
                <div className="ias-input-container">
                    <ShowHidePassword
                        id="card_pin"
                        name="pin"
                        onChange={this.handleChange}
                        placeholder="PIN"
                        value={this.state.form.pin}
                    />
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="ias-input-container">
                    <label htmlFor="PKI_Key_Select">Key
                        <select
                            id="PKI_Key_Select"
                            name="keypairId"
                            onChange={this.handleChange}
                            value={this.state.form.keypairId}
                        >
                            {certOptions}
                            <option key="generate" value={KEYPAIR_ID_GENERATE}>Generate a key pair</option>
                        </select>
                    </label>
                </div>
                {PINElement}
            </React.Fragment>
        );
    }

    render() {
        const enrollElements = this.state.parsedCerts ? this.renderEnrollElements() : null;
        const loadingElement = this.state.generating ? <LoadingIndicator message="Generating" /> : null;

        return (
            <Authenticator
                description="The PKI Method authenticates using special key files known as certificates. The
                             certificates are stored on a hardware device connected to your computer."
                {...this.props}
            >
                {enrollElements}
                <button
                    className="ias-button"
                    disabled={!!this.state.parsedCerts}
                    onClick={this.getCertificates}
                    type="button"
                >
                    Get Certificates
                </button>
                <TestAuthenticatorButton {...this.props.test} />
                {loadingElement}
            </Authenticator>
        );
    }
}

export default PKIMethod;
