import {camelizeKeys, decamelize, decamelizeKeys} from 'humps';

export const API_STATUS = {
    INVALID_ENDPOINT_SESSION: 433,
    INVALID_LOGIN_SESSION: 434,
    INVALID_LOGIN_PROCESS: 444,
    OK: 200
};

// Makes an API request, converting to/from camelcase in the URL params as well as request & response payload
export function apiFetch(method, endpoint, {params, data, preserveRequestCase} = {}) {
    const url = '/api/v1/' + endpoint;

    const jsonFetchOptions = {
        camelize: true,
        data,
        decamelize: !preserveRequestCase,
        method,
        params,
        url
    };

    return jsonFetch(jsonFetchOptions);
}

// A wrapper for the Fetch API that can convert to/from JSON and camelCase for us (camelize/decamelize options).
// Webpack includes Fetch and Promise polyfills so this will work across all browsers.
// - If a response has a status code other than 200, its Promise is rejected
// - Setting options.timeout will reject the Promise after the specified number of ms with status='timeout'
// - Calling abort() on the returned Promise will reject the Promise with status='abort'
export default function jsonFetch(options = {}) {
    // Get fetch options
    const {camelize, data, decamelize, params, timeout} = options;

    const method = options.method || 'GET';

    let url = options.url;
    if (params) {
        url = addParamsToUrl(url, params, decamelize);
    }

    const fetchOptions = {
        method,
        headers: { 'Accept': 'application/json' }
    };

    if (data) {
        const bodyData = decamelize ? decamelizeKeys(data) : data;
        fetchOptions.body = JSON.stringify(bodyData);
        fetchOptions.headers['Content-Type'] = 'application/json';
    }

    // Make fetch request
    let abortFunction = null;
    let promisePending = true;
    let timeoutTimerID = null;
    const clearTimeoutTimer = () => {
        if (timeoutTimerID) {
            clearTimeout(timeoutTimerID);
        }
    };

    const promise = new Promise((resolve, reject) => {
        let fetchResponse = null;
        fetch(url, fetchOptions)
            .then(response => {
                // Format: response = { json: () => Promise, ok: true, status: 200, statusText: 'OK' }
                clearTimeoutTimer();
                fetchResponse = response;
                return response.json();
            }).then(jsonData => {
                return camelize ? camelizeKeys(jsonData) : jsonData;
            }).then((data) => {
                if (promisePending === false) {
                    return;
                }
                promisePending = false;

                if (fetchResponse.ok) {
                    resolve(data);
                }
                else {
                    const {statusText, status} = fetchResponse;
                    const failedResponseData = {data, status, statusText, url};
                    reject(failedResponseData);
                }
            }).catch(reject);

        if (timeout) {
            timeoutTimerID = setTimeout(() => {
                if (promisePending) {
                    promisePending = false;
                    reject({
                        status: 'timeout',
                        url
                    });
                }
            }, timeout);
        }

        abortFunction = () => {
            clearTimeoutTimer();
            if (promisePending) {
                promisePending = false;
                reject({
                    status: 'abort',
                    url
                });
            }
        };
    });

    promise.abort = () => abortFunction();    // In case abortFunction isn't already set, don't pass reference directly

    return promise;
}

function addParamsToUrl(url, params, decamelizeProps) {
    let newUrl = url;
    const queryStrings = [];
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const unencodedProp = decamelizeProps ? decamelize(key) : key;
            const encodedProp = encodeURIComponent(unencodedProp);
            const encodedValue = encodeURIComponent(params[key]);
            queryStrings.push(encodedProp + '=' + encodedValue);
        }
    }

    if (queryStrings.length) {
        newUrl += '?' + queryStrings.join('&');
    }

    return newUrl;
}
