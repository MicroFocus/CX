import * as api from '../api/api';
import {catchCommonErrors, createToastFromJsonErrors} from './error-handlers.actions';

export const abortEnrollProcess = (enrollProcessId) => (dispatch, getStore) => {
    const loginSessionId = getStore().authentication.loginSessionId;

    return api.abortEnrollProcess(enrollProcessId, loginSessionId)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};

export const beginEnrollProcess = (methodId) => (dispatch, getStore) => {
    const loginSessionId = getStore().authentication.loginSessionId;

    return api.beginEnrollProcess(loginSessionId, methodId)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};

export const createUserTemplate = (enrollProcessId, categoryId, comment) => (dispatch, getStore) => {
    const {userId, loginSessionId} = getStore().authentication;

    return api.createUserTemplate(userId, loginSessionId, enrollProcessId, categoryId, comment)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};

export const deleteUserTemplate = (templateId) => (dispatch, getStore) => {
    const {loginSessionId, userId} = getStore().authentication;

    return api.deleteUserTemplate(userId, loginSessionId, templateId)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};

export const doEnroll = (enrollProcessId, enrollData, keepCamelCase, templateIdToModify) => (dispatch, getStore) => {
    const loginSessionId = getStore().authentication.loginSessionId;

    return api.doEnroll(enrollProcessId, loginSessionId, enrollData, keepCamelCase, templateIdToModify)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};

export const getDefaultRecipient = (methodId) => (dispatch, getStore) => {
    const {userId, loginSessionId} = getStore().authentication;

    return api.getDefaultRecipient(userId, loginSessionId, methodId)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};

export const modifyUserTemplate = (enrollProcessId, templateId, comment) => (dispatch, getStore) => {
    const {loginSessionId, userId} = getStore().authentication;

    return api.modifyUserTemplate(userId, loginSessionId, enrollProcessId, templateId, comment)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};

export const getTotpQrCode = (isBase32Secret) => (dispatch) => {
    return api.getTotpQrCode(isBase32Secret)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};

export const getWinHelloInfo = () => (dispatch, getStore) => {
    const {userId, loginSessionId} = getStore().authentication;

    return api.getWinHelloInfo(userId, loginSessionId)
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors);
};
