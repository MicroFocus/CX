import jsonFetch from '../json-fetch';
import CommonCardHandler from './common-card-devices.api';
import t from '../../i18n/locale-keys';

const PKI_GENERATE_KEYPAIR_SUFFIX = '/generatekeypair';
const PKI_GET_CERTIFICATES_SUFFIX = '/getcertificates';
const PKI_SIGN_CHALLENGE_SUFFIX = '/signchallenge';

function callPKIService(urlSuffix, method, data) {
    const originalPromise = jsonFetch({
        camelize: true,
        data,
        decamelize: true,
        method,
        url: CommonCardHandler.PKI_SERVICE_URL + urlSuffix
    });

    const promise = originalPromise.catch((failedResponseData) => {
        if (failedResponseData.status) {
            return Promise.reject(t.pkiServiceError());
        }

        return Promise.reject(t.pkiServiceUnavailable());
    }).then((data) => {
        const {result} = data;
        if (result) {
            if (result === 'WRONG_PIN') {
                return Promise.reject(t.pkiWrongPin());
            }
            else if (result === 'KEY_NOT_FOUND') {
                return Promise.reject(t.pkiKeyNotFound());
            }
            else return Promise.reject(t.unknownErrorCode(result));
        }

        return data;
    });

    promise.abort = originalPromise.abort;

    return promise;
}

export const pkiGenerateKeypair = (data) => callPKIService(PKI_GENERATE_KEYPAIR_SUFFIX, 'POST', data);
export const pkiGetCertificates = () => callPKIService(PKI_GET_CERTIFICATES_SUFFIX, 'GET', null);

export const pkiSignChallenge = (data) => callPKIService(PKI_SIGN_CHALLENGE_SUFFIX, 'POST', data);
