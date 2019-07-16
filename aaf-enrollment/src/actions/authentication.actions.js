import * as api from '../api/api';
import {createToast, STATUS_TYPE} from '../ux/ux';
import * as types from './action-types';
import {API_STATUS} from '../api/json-fetch';
import {clearStorageItem, saveStorageItem, storageItems} from '../utils/local-storage';
import {catchLostServerConnection, createToastFromJsonErrors} from './error-handlers.actions';
import history from '../history';
import {fetchPolicies} from './methods-display.actions';
import {methodIds} from '../data/MethodData';
import t from '../i18n/locale-keys';

const CHECK_LOGIN_SESSION_INTERVAL = 60 * 1000;
const IMPLEMENTED_AUTH_METHODS = [methodIds.PASSWORD, methodIds.LDAP_PASSWORD];   // OSP will replace
let LOGIN_SESSION_TIMEOUT_MS;
if (process.env.NODE_ENV === 'development') {
    LOGIN_SESSION_TIMEOUT_MS = 4 * 60 * 60 * 1000;  // 4 hours in development
}
else {
    LOGIN_SESSION_TIMEOUT_MS = 5 * 60 * 1000;  // 5 min in production
}

let checkLoginSessionIntervalID = null;
let lastActivityTime = new Date();      // Keep track of last activity time so we can logout user if idle too long

export function authenticateUser(username, methodId, formData) {
    return (dispatch, getStore) => {
        dispatch({ type: types.AUTHENTICATE_USER_REQUEST });

        return api.beginLogonProcess(username, methodId, false)
            .then(({logonProcessId}) => {
                return api.doLogon(logonProcessId, formData, false);
            })
            .then(result => {
                if (result.status === 'OK') {
                    setCheckLoginSessionInterval(dispatch, getStore);
                    saveStorageItem(storageItems.LOGIN_SESSION_ID, result.loginSessionId);
                    dispatch({ type: types.AUTHENTICATE_USER_SUCCESS, result });
                    fetchPolicies()(dispatch, getStore);      // Load policies so deleteme button shows up as needed
                }
                else {
                    createToast({ type: STATUS_TYPE.ERROR, description: result.msg });
                }
            })
            .catch(catchLostServerConnection)
            .catch(createToastFromJsonErrors)
            .catch((failedResponseData) => {
                dispatch({ type: types.AUTHENTICATE_USER_FAILURE, failedResponseData });
            });
    };
}

export const deleteLogonProcess = (logonProcessId) => () => {
    return api.deleteLogonProcess(logonProcessId)
        .catch(catchLostServerConnection)
        .catch(createToastFromJsonErrors);
};

export const deleteUser = () => (dispatch, getStore) => {
    const {userId, loginSessionId} = getStore().authentication;

    return api.deleteUser(userId, loginSessionId)
        .catch(catchLostServerConnection)
        .catch(createToastFromJsonErrors);
};

export const doTestLogon = (templateId, logonProcessId, formData, keepCamelCase) => (dispatch, getStore) => {
    const {userId, loginSessionId} = getStore().authentication;

    return api.doTestLogon(userId, loginSessionId, templateId, logonProcessId, formData, keepCamelCase)
        .catch(catchLostServerConnection)
        .catch(createToastFromJsonErrors);
};

export function handleExpiredLoginSession(dispatch) {
    clearCheckLoginSessionInterval();
    clearStorageItem(storageItems.LOGIN_SESSION_ID);    // Clear expired session from storage
    dispatch({type: types.CLEAR_USER_INFO});
    createToast({
        type: STATUS_TYPE.ERROR,
        description: t.loginSessionExpired()
    });
}

const checkLoginSession = (dispatch, getStore) => {
    // Expire login session if it has been too long since time of last activity.
    const currentTime = new Date();
    if (currentTime - lastActivityTime > LOGIN_SESSION_TIMEOUT_MS) {
        handleExpiredLoginSession(dispatch);
        return;
    }

    const loginSessionId = getStore().authentication.loginSessionId;
    api.readLoginSessionInfo(loginSessionId)
        .catch((failedResponseData) => {
            if (failedResponseData.status === API_STATUS.INVALID_LOGIN_SESSION) {
                handleExpiredLoginSession(dispatch);
            }
            else {
                console.log('Unable to communicate with server to check login session');
            }
        });
};

function clearCheckLoginSessionInterval() {
    if (checkLoginSessionIntervalID) {
        clearInterval(checkLoginSessionIntervalID);
        checkLoginSessionIntervalID = null;
    }
}

export function clearUser() {
    return (dispatch) => dispatch({ type: types.CLEAR_USER_INFO });
}

export const logoutUser = () => (dispatch, getStore) => {
    const loginSessionId = getStore().authentication.loginSessionId;
    return api.deleteLoginSession(loginSessionId).finally(() => {
        clearCheckLoginSessionInterval();
        clearStorageItem(storageItems.LOGIN_SESSION_ID);
        dispatch({ type: types.CLEAR_USER_INFO });
        createToast({ type: STATUS_TYPE.OK, description: t.userSignOutSuccessful() });
    });
};

export function loadLoginChains(username) {
    return (dispatch) => {
        dispatch({ type: types.LOGIN_CHAINS_REQUEST });

        return api.getLoginChains(username)
            .then((data) => {
                if (data.userIsLocked) {
                    createToast({
                        type: STATUS_TYPE.ERROR,
                        description: t.userLockedOut()
                    });
                }
                else {
                    const chains = data.chains.filter((chain) => {
                        for (let methodIndex = 0; methodIndex < chain.methods.length; methodIndex++) {
                            if (IMPLEMENTED_AUTH_METHODS.indexOf(chain.methods[methodIndex]) === -1) {
                                return false;
                            }
                        }
                        return true;
                    });
                    dispatch({ type: types.LOGIN_CHAINS_SUCCESS, chains });
                }
            })
            .catch(catchLostServerConnection)
            .catch(createToastFromJsonErrors)
            .catch((failedResponseData) => {
                dispatch({ type: types.LOGIN_CHAINS_FAILURE, failedResponseData });
            });
    };
}

// Load login session and make sure it isn't expired. This only happens on page load
export const loadLoginSession = (loginSessionId) => (dispatch, getStore) => {
    return api.readLoginSessionInfo(loginSessionId)
        .then(result => {
            setCheckLoginSessionInterval(dispatch, getStore);
            dispatch({ type: types.LOAD_LOGIN_SESSION_INFO, loginSessionId, result });
            fetchPolicies()(dispatch, getStore);      // Load policies so deleteme button shows up as needed
        })
        .catch(catchLostServerConnection)
        .catch((failedResponseData) => {
            // If session no longer valid, clear from storage. Regardless, clear Redux store and don't display error
            if (!failedResponseData.errorHandled) {
                clearStorageItem(storageItems.LOGIN_SESSION_ID);
            }

            dispatch({type: types.CLEAR_USER_INFO});
        });
};

export function selectLoginChainIndex(index) {
    return (dispatch) => dispatch({type: types.UPDATE_LOGIN_CHAIN, index});
}

function setCheckLoginSessionInterval(dispatch, getStore) {
    if (!checkLoginSessionIntervalID) {
        checkLoginSessionIntervalID = setInterval(() => checkLoginSession(dispatch, getStore),
            CHECK_LOGIN_SESSION_INTERVAL);
    }
}

const updateLastActivityTime = () => {
    lastActivityTime = new Date();
};

export function updateLoginFormData(key, value) {
    return (dispatch) => dispatch({type: types.UPDATE_LOGIN_FORM_DATA, key, value});
}

export function updateUsername(username) {
    return (dispatch) => dispatch({type: types.UPDATE_USERNAME, username});
}

// Update last activity time whenever user navigates
history.listen(updateLastActivityTime);
