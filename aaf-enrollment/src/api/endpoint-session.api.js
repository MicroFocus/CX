// Write all changes to this endpoint session variable to local storage, but only load it from storage on page load
import {clearStorageItem, loadStorageItem, saveStorageItem, storageItems} from '../utils/local-storage';
import {apiFetch, API_STATUS} from './json-fetch';

let endpointSessionId = loadStorageItem(storageItems.ENDPOINT_SESSION_ID);

// Import forgeSha256 only in development. See https://webpack.js.org/plugins/define-plugin/#usage
let forgeSha256 = null;
if (process.env.NODE_ENV === 'development') {
    forgeSha256 = require('../utils/forge-sha256').default;
}

function beginEndpointSession() {
    let promise = null;

    if (process.env.NODE_ENV === 'development') {
        // Endpoint constants
        const endpointId = process.env.REACT_APP_ENDPOINT_ID;
        const endpointSecret = process.env.REACT_APP_ENDPOINT_SECRET;

        // Generate psuedo-random salt
        const SALT_DIGITS = '0123456789abcdef';
        const SALT_LENGTH = 64;
        let salt = '';
        for (let i = 0; i < SALT_LENGTH; i++) {
            const saltDigitIndex = Math.floor(Math.random() * SALT_DIGITS.length);
            salt += SALT_DIGITS[saltDigitIndex];
        }

        // Generate endpoint secret hash
        const saltedEndpointId = endpointId + salt;
        const endpointIdHash = forgeSha256(saltedEndpointId);
        const saltedEndpoindSecret = endpointSecret + endpointIdHash;
        const endpointSecretHash = forgeSha256(saltedEndpoindSecret);
        promise = apiFetch('POST', `endpoints/${endpointId}/sessions`, {
            data: {
                salt,
                endpointSecretHash,
                sessionData: {}
            }
        });
    }
    else {
        promise = apiFetch('POST', 'cx/sessions', {});
    }

    // Make API request to create session from endpoint
    return promise.then((data) => {
        endpointSessionId = data.endpointSessionId;
        saveStorageItem(storageItems.ENDPOINT_SESSION_ID, endpointSessionId);
    });
}

// Wrap the provided API function to ensure it is executed with a valid endpoint session.
// Begin an endpoint session if none exists. Retry API calls with a new endpoint session if the session has expired.
export const ensureEndpointSession = (apiFunction) => function(...args) {
    const callApiFunction = () => apiFunction(endpointSessionId)(...args);
    const callApiFunctionWithNewSession = () => beginEndpointSession().then(callApiFunction);

    if (endpointSessionId) {
        return callApiFunction().catch((failedResponseData) => {
            if (failedResponseData.status === API_STATUS.INVALID_ENDPOINT_SESSION) {
                clearStorageItem(storageItems.ENDPOINT_SESSION_ID);
                return callApiFunctionWithNewSession();
            }
            else {
                throw failedResponseData;
            }
        });
    }
    else {
        return callApiFunctionWithNewSession();
    }
};
