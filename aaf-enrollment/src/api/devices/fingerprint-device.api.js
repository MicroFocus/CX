import jsonFetch from '../json-fetch';
import t from '../../i18n/locale-keys';

const FINGERPRINT_SERVICE_URL = 'https://127.0.0.1:8442/api/v1/fingerprint/capture';

export function captureFingerprint(scanIndex) {
    // Mock device service only if set in environment. Code here that will not be used is excluded from build via
    // Webpack define plugin - see https://webpack.js.org/plugins/define-plugin/#usage
    if (process.env.REACT_APP_MOCK_DEVICE_SERVICE) {
        return new Promise((resolve) => {
            const capture = {
                ISO: 'Rk1SACAyMAAAAAEIAAABLAEsAMQAxAEAAABkJ4B4ANRCAIBaADYIAIC4AKbWAECHAI/cAIDEANJNAECrAEXyAIEDAB32A'
                    + 'EBUAGUAAIBIAIzXAEDnADjkAEBaAHb0AEDMABoAAECuAQZIAIDMALxUAIChAMvEAEB7AEX9AIA9AE79AIDwADLrAECwA'
                    + 'M9YAEBQAIjbAEBnAILeAEEaAL45AEDCAEXrAID3APg9AICLANnEAIBuAKPNAICgAPTGAIDUAINYAICWAGruAICfABMGA'
                    + 'IB+AMW9AIDSAKhNAIDzAG9LAECHALPZAECxAPDGAECuANTPAECEAPFEAIDeAEbbAEC5APFPAAAA',
                captureStatus: 'Ok'
            };

            setTimeout(() => {
                if (scanIndex) {
                    const numFingers = (scanIndex === 3) ? 2 : 4;
                    const result = [];
                    for (let index = 0; index < numFingers; index++) {
                        result.push(JSON.stringify(capture));
                    }
                    resolve(result);
                }
                else {
                    resolve(capture);
                }
            }, 3000);
        });
    }

    const options = {
        method: 'POST',
        url: FINGERPRINT_SERVICE_URL
    };
    if (scanIndex) {
        options.params = {index: scanIndex};
    }
    return jsonFetch(options)
        .catch((failedResponseData) => {
            if (failedResponseData.status) {
                return Promise.reject(t.fingerServiceError());
            }
            else {
                return Promise.reject(t.fingerServiceUnavailable());
            }
        })
        .then((data) => {
            if (!data) {
                return Promise.reject(t.fingerDetectFailed());
            }
            else if (data.captureStatus === 'Ok') {
                return data;
            }
            else if (data.captureStatus === 'Timeout') {
                return Promise.reject(t.fingerTimeout());
            }
            else if (data.captureStatus === 'NoReader') {
                return Promise.reject(t.fingerReaderNotConnected());
            }
            else if (data.captureStatus === 'IndexError') {
                return t.fingerIndexError();
            }
            else if (data.captureStatus === 'NotSupported') {
                return t.fingerReaderUnsupported();
            }
            else if (data.captureStatus === 'FakeFinger') {
                return t.fingerFakeError();
            }
            else if (data.captureStatus === 'IncorrectMode') {
                return t.fingerIncorrectMode();
            }
            else {
                return Promise.reject(data.captureStatus);
            }
        });
}
