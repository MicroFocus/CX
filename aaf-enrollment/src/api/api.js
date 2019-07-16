import {apiFetch} from './json-fetch';
import {ensureEndpointSession} from './endpoint-session.api';
import {decamelizeKeys} from 'humps';
export * from './enrollment.api';

/* Normal API. The module is replaced by api.mock.js when a mock API is used. The replacement is done via webpack's
 * NormalModuleReplacementPlugin. Do not include api.js within this directory (/api) or the replacement may fail.
 * See webpack.config.dev.js
 */

const LOGIN_EVENT = 'Authenticators Management';
const TEST_EVENT = '';

export const beginLogonProcess = ensureEndpointSession((endpointSessionId) => (userName, methodId, isTest) => {
    const event = isTest ? TEST_EVENT : LOGIN_EVENT;

    return apiFetch('POST', 'logon', {
        data: {
            methodId,
            userName,
            event,
            endpointSessionId
        }
    });
});

export const deleteLoginSession = ensureEndpointSession((endpointSessionId) => (loginSessionId) => {
    return apiFetch('DELETE', `logon/sessions/${loginSessionId}`, {
        params: {
            endpointSessionId
        }
    });
});

export const deleteLogonProcess = ensureEndpointSession((endpointSessionId) => (logonProcessId) => {
    return apiFetch('DELETE', `logon/${logonProcessId}`, {
        params: {
            endpointSessionId
        }
    });
});

export const deleteUser = (userId, loginSessionId) => {
    return apiFetch('POST', `users/${userId}/delete`, {
        params: {
            loginSessionId
        }
    });
};

export const doLogon = ensureEndpointSession((endpointSessionId) => (logonProcessId, formData, keepCamelCase) => {
    const data = decamelizeKeys({
        endpointSessionId
    });

    data.response = formData;

    return apiFetch('POST', `logon/${logonProcessId}/do_logon`, {
        data,
        preserveRequestCase: keepCamelCase
    });
});

export const doTestLogon = (userId, loginSessionId, templateId, logonProcessId, formData, keepCamelCase) => {
    const camelizedData = { loginSessionId };
    if (logonProcessId) {
        camelizedData.logonProcessId = logonProcessId;
    }

    const data = decamelizeKeys(camelizedData);
    if (formData) {
        data.response = formData;
    }

    return apiFetch('POST', `users/${userId}/templates/${templateId}/test`, {
        data,
        preserveRequestCase: keepCamelCase
    });
};

export const getCategories = (loginSessionId) => {
    return apiFetch('GET', 'categories', {
        params: {
            loginSessionId
        }
    });
};

export const getEnrollableChains = (username, loginSessionId) => {
    return apiFetch('POST', 'enroll/chains/get', {
        params: {
            userName: username,
            loginSessionId
        }
    });
};

export const getLoginChains = ensureEndpointSession((endpointSessionId) => (username) => {
    return apiFetch('GET', 'logon/chains', {
        params: {
            userName: username,
            isTrusted: 'true',
            event: LOGIN_EVENT,
            endpointSessionId
        }
    });
});

export const getMethodTitles = (loginSessionId) => {
    return apiFetch('POST', 'methods/get', {
        params: {
            loginSessionId
        }
    });
};

export const getPolicies = (userId, loginSessionId) => {
    return apiFetch('GET', `users/${userId}/effective_policy`, {
        params: {
            loginSessionId
        }
    });
};

export const getUserTemplates = (userId, loginSessionId) => {
    return apiFetch('GET', `users/${userId}/templates`, {
        params: {
            loginSessionId
        }
    });
};

export const readLoginSessionInfo = ensureEndpointSession((endpointSessionId) => (loginSessionId) => {
    return apiFetch('GET', `logon/sessions/${loginSessionId}`, {
        params: { endpointSessionId }
    });
});
