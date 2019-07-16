import {createToast, STATUS_TYPE} from '../ux/ux';
import {API_STATUS} from '../api/json-fetch';
import {handleExpiredLoginSession} from './authentication.actions';
import t from '../i18n/locale-keys';

/* Handles common REST API errors
 * Mark errors already handled by setting errorHandled on the error object, then rethrowing the error. This allows
 * later .catch() and .then() statements to correctly determine whether an error was thrown and if it was handled.
 */

// Returns true if failed to fetch (could not contact server)
export function isNetworkError(failedResponseData) {
    if (!failedResponseData.status && failedResponseData.message) {
        return (failedResponseData.message.indexOf('fetch') !== -1);
    }

    return false;
}
function handleLostServerConnection() {
    createToast({
        type: STATUS_TYPE.ERROR,
        description: t.networkCommunicationLost()
    });
}

// Catch for common HTTP errors, i.e. login session expired and internet disconnected. If error handled, mark it so.
export const catchCommonErrors = (dispatch) => (failedResponseData) => {
    if (isNetworkError(failedResponseData)) {
        failedResponseData.errorHandled = true;
        handleLostServerConnection();
    }
    else if (failedResponseData.status === API_STATUS.INVALID_LOGIN_SESSION) {
        failedResponseData.errorHandled = true;
        handleExpiredLoginSession(dispatch);
    }

    throw failedResponseData;
};

// Catch for lost server connection. If error handled, mark it so.
export const catchLostServerConnection = (failedResponseData) => {
    if (isNetworkError(failedResponseData)) {
        failedResponseData.errorHandled = true;
        handleLostServerConnection();
    }

    throw failedResponseData;
};

// If the error hasn't been handled, notify user of an HTTP error by creating a toast, then re-throw the error(s).
// Don't mark the error as handled. The user is simply notified of the error.
// This function is used for Advanced Auth JSON requests with HTTP error status codes,
// where failedResponseData.data.errors should be an array of error messages.
export function createToastFromJsonErrors(failedResponseData) {
    if (!failedResponseData.errorHandled) {
        if (failedResponseData.data && failedResponseData.data.errors) {
            const errors = failedResponseData.data.errors;
            const description = errors.map(error => error.description).join('\n');
            createToast({ type: STATUS_TYPE.ERROR, description });
            throw errors;
        }
        else {
            console.error(failedResponseData);
            throw failedResponseData;
        }
    }
    else {
        throw failedResponseData;
    }
}
