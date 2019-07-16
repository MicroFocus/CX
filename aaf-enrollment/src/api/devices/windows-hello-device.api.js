import jsonFetch from '../json-fetch';
import t from '../../i18n/locale-keys';

const WINHELLO_SERVICE_URL = 'https://127.0.0.1:8440/api/v1/wh';
const WINHELLO_ENROLL_SUFFIX = '/enroll';
const WINHELLO_LOGON_SUFFIX = '/logon';

function callWinHelloService(urlSuffix, data) {
    return jsonFetch({
        camelize: true,
        data,
        decamelize: true,
        method: 'POST',
        url: WINHELLO_SERVICE_URL + urlSuffix
    }).catch((failedResponseData) => {
        if (failedResponseData.status) {
            return Promise.reject(t.windowsHelloServiceUnavailable());
        }

        return Promise.reject(t.windowsHelloServiceError());
    }).then((data) => {
        if (data.result === 'failed') {
            return Promise.reject(t.verificationFailed());
        }

        return data;
    });
}

export const winHelloEnroll = (data) => callWinHelloService(WINHELLO_ENROLL_SUFFIX, data);
export const winHelloLogon = (data) => callWinHelloService(WINHELLO_LOGON_SUFFIX, data);
