import {apiFetch} from './json-fetch';
import { decamelizeKeys } from 'humps';
import {ensureEndpointSession} from './endpoint-session.api';

export function abortEnrollProcess(enrollProcessId, loginSessionId) {
    return apiFetch('DELETE', `enroll/${enrollProcessId}`, {
        params: {
            loginSessionId
        }
    });
}

export function beginEnrollProcess(loginSessionId, methodId) {
    return apiFetch('POST', 'enroll', {
        data: {
            loginSessionId,
            methodId
        }
    });
}

export function createUserTemplate(userId, loginSessionId, enrollProcessId, categoryId = '', comment) {
    return apiFetch('POST', `users/${userId}/templates`, {
        data: {
            loginSessionId,
            enrollProcessId,
            categoryId,
            comment
        }
    });
}

export function deleteUserTemplate(userId, loginSessionId, templateId) {
    return apiFetch('DELETE', `users/${userId}/templates/${templateId}`, {
        params: {
            loginSessionId
        },
    });
}

export function doEnroll(enrollProcessId, loginSessionId, enrollData, keepCamelCase, templateIdToModify) {
    const camelizedData = { loginSessionId };
    if (templateIdToModify) {
        camelizedData.authTId = templateIdToModify;
    }

    const data = decamelizeKeys(camelizedData);
    if (enrollData) {
        data.response = enrollData;
    }

    return apiFetch('POST', `enroll/${enrollProcessId}/do_enroll`, {
        data,
        preserveRequestCase: keepCamelCase
    });
}

export function getDefaultRecipient(userId, loginSessionId, methodId) {
    return apiFetch('POST', `users/${userId}/method/${methodId}/get_recipient`, {
        params: {
            loginSessionId
        }
    });
}

export const getTotpQrCode = ensureEndpointSession((endpointSessionId) => (isBase32Secret) => {
    return apiFetch('POST', 'logon_method/TOTP:1', {
        data: {
            generateAuthenticator: true,
            isBase32Secret,
            endpointSessionId
        }
    });
});

export const getWinHelloInfo = (userId, loginSessionId) => {
    return apiFetch('POST', `logon_method/WINHELLO:1/account_details/${userId}`, {
        params: {
            loginSessionId
        }
    });
};

export function modifyUserTemplate(userId, loginSessionId, enrollProcessId, templateId, comment) {
    const data = {
        loginSessionId,
        comment
    };

    if (enrollProcessId) {
        data.enrollProcessId = enrollProcessId;
    }

    return apiFetch('PUT', `users/${userId}/templates/${templateId}`, {
        data
    });
}
