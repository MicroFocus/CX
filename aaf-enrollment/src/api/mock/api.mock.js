import {camelizeKeys} from 'humps';
import {methodIds} from '../../data/MethodData';
import mockData from './mock-data';
import {loadStorageItem, storageItems} from '../../utils/local-storage';

export * from './enrollment.api.mock';

/* A mock API loaded by webpack module replacement in webpack.config.dev.js
 * For manual testing, we can change local storage variables to augment the behavior of this API.
 * Delete LOGIN_SESSION_ID to make the login session expire. Set ALTERNATE_API_RESPONSE to specify when an error
 * API return value should be used instead of the default.
 */

const RESPONSE_TIME_MS = 300;
const CATEGORIES_ENABLED = true;
let logonProcessData = {};

export function getAlternateApiResponseSetting() {
    return loadStorageItem('ALTERNATE_API_RESPONSE') || '';
}

export function beginLogonProcess(userName, methodId, isTest) {
    logonProcessData = { userName, methodId, isTest };
    return simulateResponse(mockData.logon.beginLogonProcess);
}

export function deleteLoginSession(loginSessionId) {
    if (loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.deleteLoginSession.success);
    }
    else {
        return simulateResponse(mockData.deleteLoginSession.fail, true);
    }
}

export function deleteUser(userId, loginSessionId) {
    return simulateResponse(null);
}

export function doLogon(logonProcessId, formData) {
    if (logonProcessData.userName === 'admin' && logonProcessData.methodId === methodIds.PASSWORD) {
        if (formData.answer === 'admin') {
            return simulateResponse(mockData.logon.successLogon);
        }
        else {
            return simulateResponse(mockData.logon.incorrectPasswordLogon);
        }
    }
    else {
        return simulateResponse(mockData.logon.failLogon, true);
    }
}

export function doTestLogon(userId, loginSessionId, templateId, logonProcessId, formData, keepCamelCase) {
    return simulateResponse(mockData.logon.successLogon);
}

export function deleteLogonProcess(logonProcessId) {
    return simulateResponse(mockData.logon.abortLogonProcess);
}

export function getCategories(loginSessionId) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.loginSessionInfo.expired, true);
    }

    if (CATEGORIES_ENABLED) {
        return simulateResponse(mockData.categories.categoriesEnabled);
    }
    else {
        return simulateResponse(mockData.categories.noCategories);
    }
}

export function getEnrollableChains(username) {
    if (CATEGORIES_ENABLED) {
        return simulateResponse(mockData.enrollableChains.categoriesEnabled);
    }
    else {
        return simulateResponse(mockData.enrollableChains.noCategories);
    }
}

export function getLoginChains(username) {
    if (username === 'admin') {
        return simulateResponse(mockData.loginChains.success);
    }
    else if (username === 'admin2') {
        return simulateResponse(mockData.loginChains.lockedOut);
    }
    else {
        return simulateResponse(mockData.loginChains.fail, true);
    }
}

export function getMethodTitles(loginSessionId) {
    return simulateResponse(mockData.methodTitles.success);
}

export function getPolicies(userId, loginSessionId) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.loginSessionInfo.expired, true);
    }

    return simulateResponse(mockData.policies.success);
}

export function getUserTemplates(userId, loginSessionId) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.loginSessionInfo.expired, true);
    }

    if (CATEGORIES_ENABLED) {
        return simulateResponse(mockData.templates.categoriesEnabled);
    }
    else {
        return simulateResponse(mockData.templates.noCategories);
    }
}

export function loginSessionMatchesStorage(loginSessionId) {
    if (!loginSessionId) {
        return false;
    }
    else {
        return (loginSessionId === loadStorageItem(storageItems.LOGIN_SESSION_ID));
    }
}

export function readLoginSessionInfo(loginSessionId) {
    if (loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.loginSessionInfo.success);
    }
    else {
        return simulateResponse(mockData.loginSessionInfo.fail, true);
    }
}

export function simulateResponse(data, isReject) {
    return new Promise((resolve, reject) => {
        const camelizedData = camelizeKeys(data);
        setTimeout(() => {
            if (isReject) {
                reject(camelizedData);
            }
            else {
                resolve(camelizedData);
            }
        }, RESPONSE_TIME_MS);
    });
}
