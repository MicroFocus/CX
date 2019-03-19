import jsonFetch from './json-fetch';
import CommonCardHandler from './commonCardHandler';

const PKI_SERVICE_URL = CommonCardHandler.PKI_SERVICE_URL;
const PKI_GENERATE_KEYPAIR_SUFFIX = '/generatekeypair';
const PKI_GET_CERTIFICATES_SUFFIX = '/getcertificates';
const PKI_SIGN_CHALLENGE_SUFFIX = '/signchallenge';

const _ = (string) => string;  // TODO: localize
const _k = (string) => string;  // TODO: localize

function callPKIService(urlSuffix, method, data) {
    const originalPromise = jsonFetch({
        camelize: true,
        data,
        decamelize: true,
        method,
        url: PKI_SERVICE_URL + urlSuffix
    });

    const promise = originalPromise.catch((failedResponseData) => {
        if (failedResponseData.status) {
            return Promise.reject('PKI service error');
        }

        return Promise.reject('PKI service is not available');
    }).then((data) => {
        const {result} = data;
        if (result) {
            if (result === 'WRONG_PIN') {
                return Promise.reject(_k('Incorrect PIN'));
            }
            else if (result === 'KEY_NOT_FOUND') {
                return Promise.reject(_('Key not found. It must be a wrong card'));
            }
            else return Promise.reject('Unexpected error code: ' + result);
        }

        return data;
    });

    promise.abort = originalPromise.abort;

    return promise;
}

export const pkiGenerateKeypair = (data) => callPKIService(PKI_GENERATE_KEYPAIR_SUFFIX, 'POST', data);
export const pkiGetCertificates = () => callPKIService(PKI_GET_CERTIFICATES_SUFFIX, 'GET', null);

export const pkiSignChallenge = (data) => callPKIService(PKI_SIGN_CHALLENGE_SUFFIX, 'POST', data);
