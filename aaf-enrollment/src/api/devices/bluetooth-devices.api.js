import jsonFetch from '../json-fetch';
import t from '../../i18n/locale-keys';

const BLUETOOTH_DETECT_DEVICE_SUFFIX = '/detectdevice';
const BLUETOOTH_GET_DEVICES_SUFFIX = '/getdevices';
const BLUETOOTH_SERVICE_URL = 'https://127.0.0.1:8441/api/v1/bluetooth';

function callBluetoothService(urlSuffix, method, data) {
    const options = {
        camelize: true,
        decamelize: true,
        url: BLUETOOTH_SERVICE_URL + urlSuffix,
        method
    };

    if (data) {
        options.data = data;
    }

    return jsonFetch(options).catch((failedResponseData) => {
        if (failedResponseData.status) {
            return Promise.reject(t.bluetoothServiceUnavailable());
        }

        return Promise.reject(t.bluetoothServiceError());
    });
}

export const bluetoothGetDevices = () => {
    // Mock device service only if set in environment. Code here that will not be used is excluded from build via
    // Webpack define plugin - see https://webpack.js.org/plugins/define-plugin/#usage
    if (process.env.REACT_APP_MOCK_DEVICE_SERVICE) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    devices: [
                        { name: 'MotoG3', address: 'e0986173d12c', type: 'phone', hash: '9d00de774e0ce7e045f06' },
                        { name: 'keyboard', address: '9cd746e1234', type: 'peripheral', hash: '9b67e2d07088a1f0bd64b' }
                    ]
                });
            }, 2000);
        });
    }

    return callBluetoothService(BLUETOOTH_GET_DEVICES_SUFFIX, 'GET', null)
        .then((data) => {
            if (data.result === 'BLUETOOTH_DISABLED' || data.status === 'BT_OFF') {
                return Promise.reject(t.bluetoothTurnedOff());
            }

            return data;
        });
};

export const bluetoothDetectDevice = (address) => {
    // Mock device service only if set in environment. Code here that will not be used is excluded from build via
    // Webpack define plugin - see https://webpack.js.org/plugins/define-plugin/#usage
    if (process.env.REACT_APP_MOCK_DEVICE_SERVICE) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ result: 'CONNECTED', address: '9cd746e1234' });
            }, 800);
        });
    }

    return callBluetoothService(BLUETOOTH_DETECT_DEVICE_SUFFIX, 'POST', { address });
};
