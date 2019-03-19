import jsonFetch from './json-fetch';

const FINGERPRINT_SERVICE_URL = 'https://127.0.0.1:8442/api/v1/fingerprint/capture';

export function captureFingerprint(data) {
    // Keep track of the original promise so we can use its abort() function
    const originalPromise = jsonFetch({
        data,
        method: 'POST',
        url: FINGERPRINT_SERVICE_URL
    });

    const promise = originalPromise
        .catch((failedResponseData) => {
            if (failedResponseData.status === 'abort') {
                return Promise.reject(failedResponseData);
            }
            else if (failedResponseData.status) {
                return Promise.reject('Fingerprint service error');
            }
            else {
                return Promise.reject('Fingerprint service is not available');
            }
        })
        .then((data) => {
            if (data.captureStatus === 'Ok') {
                return data;
            }
            else if (data.captureStatus === 'Timeout') {
                return Promise.reject('Scan Timeout');
            }
            else if (data.captureStatus === 'NoReader') {
                return Promise.reject('Fingerprint reader is not connected');
            }
            else {
                return Promise.reject(data.captureStatus);
            }
        });

    promise.abort = originalPromise.abort;

    return promise;
}
