import React from 'react';
import {STATUS_TYPE} from '../../../../ux/ux';
import {bluetoothDetectDevice} from '../../../../api/devices/bluetooth-devices.api';
import t from '../../../../i18n/locale-keys';

class BluetoothTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setTestButtonAvailability(false);

        this.props.doTestLogon(null).then((data) => {
            const hash = data.hasOwnProperty('hashes') ? data.hashes[0] : null;
            if (hash) {
                this.props.showStatus(t.bluetoothWaitingForService(), STATUS_TYPE.INFO);
                this.props.registerPromise(
                    bluetoothDetectDevice(hash)
                ).then((data) => {
                    const {address, result, status} = data;
                    const logonData = {status};
                    if (result === 'CONNECTED') {
                        logonData.address = address;
                    } else if (result !== 'DISCONNECTED') {
                        return Promise.reject(t.bluetoothServiceError());
                    }

                    this.props.doTestLogon(logonData);
                }).catch((error) => {
                    // Different error types: .msg (server), .message (JS exception), string (application threw)
                    const message = error.msg || error.message || error;
                    this.props.markTestComplete(false, message, STATUS_TYPE.ERROR);
                });
            }
            else {
                this.props.markTestComplete(false, t.unknownError(), STATUS_TYPE.ERROR);
            }
        });
    }

    render() {
        return null;
    }
}

export default BluetoothTest;