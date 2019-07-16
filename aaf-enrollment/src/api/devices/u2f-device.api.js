import jsonFetch from '../json-fetch';
import u2fApi from 'u2f-api';
import t from '../../i18n/locale-keys';

const U2F_SERVICE_URL = 'https://127.0.0.1:8441/api/v1/fidou2f';

export function getU2FOriginFromUrl(url) {
    const re = new RegExp('^(https?://)[^/]*/?');
    const originarray = re.exec(url);
    if (originarray == null) {
        return originarray;
    }

    let origin = originarray[0];
    while (origin.charAt(origin.length - 1) === '/') {
        origin = origin.substring(0, origin.length - 1);
    }
    if (origin === 'http:' || origin === 'https:') {
        return null;
    }

    return origin;
}

function u2fCheckServiceError(data) {
    if (data.errorCode) {
        throw data;
    }

    return data;
}

export function u2fParseError(error) {
    console.error(error);

    let message;
    let code = null;
    if (error.errorCode) {
        code = error.errorCode;
    }
    else if (error.metaData) {
        code = error.metaData.code;
    }

    if (code) {
        switch (code) {
            case 1:
                message = t.u2fNotConnected();
                break;
            case 2:
                message = t.badRequest();
                break;
            case 3:
                message = t.configurationNotSupported();
                break;
            case 4:
                message = t.u2fAlreadyRegistered();
                break;
            case 5:
                message = t.u2fTimeout();
                break;
            default:
                message = t.unknownErrorCode(code);
                break;
        }
    }
    else if (error.msg) {
        message = error.msg;
    }
    else {
        message = t.unknownError();
    }

    return message;
}

function u2fParseServiceError(failedResponseData) {
    if (failedResponseData.status) {
        return Promise.reject({msg: t.u2fServiceError()});
    }

    return Promise.reject({
        msg: t.u2fServiceUnavailable()
    });
}

// Register the U2F device. If browser doesn't support U2F registration, use Device Service.
export function u2fRegister(registerRequests, signRequests) {
    // Only HTTPS protocol supported for FIDO U2F
    if (window.location.protocol && window.location.protocol.toLowerCase() !== 'https:') {
        return Promise.reject({
            msg: t.u2fUnsupportedHTTP()
        });
    }

    return u2fApi.isSupported().then((supported) => {
        const registrar = supported ? u2fApi.register : u2fRegisterService;
        return registrar(registerRequests, signRequests);
    });
}

function u2fRegisterService(registerRequests, signRequests) {
    // Only port 443 supported for FIDO U2F service
    if (window.location.port && window.location.port !== '443') {
        return Promise.reject({
            msg: t.u2fUnsupportedWrongPort()
        });
    }

    // Get appId, challenge, and version from registerRequests so we don't have to ask for them via another parameter
    const registerData = registerRequests[0];

    return jsonFetch({
            data: {registerRequests, signRequests},
            method: 'POST',
            url: U2F_SERVICE_URL + '/register'
        }).catch(u2fParseServiceError)
        .then(u2fCheckServiceError)
        .then((data) => {
            return {
                registrationData: data.registrationData,
                clientData: data.clientData,
                appId: registerData.appId,
                challenge: registerData.challenge,
                version: registerData.version
            };
        });
}

export function u2fSign(signRequests) {
    // Only HTTPS protocol supported for FIDO U2F
    if (window.location.protocol && window.location.protocol.toLowerCase() !== 'https:') {
        return Promise.reject({
            msg: t.u2fUnsupportedHTTP()
        });
    }

    return u2fApi.isSupported().then((supported) => {
        const signer = supported ? u2fApi.sign : u2fSignService;
        return signer(signRequests);
    });
}

function u2fSignService(signRequests) {
    // Only port 443 supported for FIDO U2F service
    if (window.location.port && window.location.port !== '443') {
        return Promise.reject({
            msg: t.u2fUnsupportedWrongPort()
        });
    }

    return jsonFetch({
            data: {signRequests},
            method: 'POST',
            url: U2F_SERVICE_URL + '/sign'
        }).catch(u2fParseServiceError)
        .then(u2fCheckServiceError);
}
