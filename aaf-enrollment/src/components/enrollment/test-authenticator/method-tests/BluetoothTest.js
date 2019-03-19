/* eslint-disable */
import React from 'react';
import jsonFetch from '../../../../api/json-fetch';
import {STATUS_TYPE, StatusIndicator} from '../../../../ux/ux';

const BT_SERVICE_ENDPOINT = 'https://127.0.0.1:8441/api/v1/bluetooth';

//TODO: convert this localization file
const _k = (value, value2) => {
    return value + value2;
};

const SERVICE_NOT_AVAILABLE = function() {
    return _k('Bluetooth service is not available', 'method.bluetooth.service_is_not_available');
};

class BluetoothTest extends React.PureComponent {

    constructor(props) {
        super(props);

        this.props.setTestButtonAvailability(false);

        this.props.doTestLogon(null).then((data) =>{
            console.log('hashes', data)
            const hash = data.hasOwnProperty('hashes') ? data.hashes[0] : null;
            if (hash) {
                this.BTMACByHash(hash).then((data) => {
                    const stateData = {status: data.status};
                    if (data.result === "CONNECTED") {
                        stateData.address = data.address;
                    } else if (data.result === "DISCONNECTED") {
                        stateData.address = null;
                    } else {
                        stateData.address = null;
                    }

                    this.props.doTestLogon(stateData);
                }).catch((error) => {
                    const {data, status, statusText, url} = error;
                    console.log("catch error", error);
                    this.props.showStatus(SERVICE_NOT_AVAILABLE(), STATUS_TYPE.WARN);
                });
            }
        });
    }

    render() {
        return (
            null
        );
    }

    BTMACByHash = (hash) => {
        const fetchOptions = {
            url: BT_SERVICE_ENDPOINT + '/detectdevice',
            method: 'POST',
            data: {
                address: hash
            },
        };

       return jsonFetch(fetchOptions)
            .then(data => {
                console.log('BTMACByHash', data);
                return data;
            });
    };
}

export default BluetoothTest;