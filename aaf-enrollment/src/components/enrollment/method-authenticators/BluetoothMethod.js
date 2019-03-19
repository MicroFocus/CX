/* eslint-disable */
import './BluetoothMethod.scss';
import React from 'react';
import Authenticator from '../Authenticator';
import jsonFetch from '../../../api/json-fetch';
import {STATUS_TYPE} from '../../../ux/ux';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

//TODO convert this to our localization
const _ = (value) => {
    return value;
};

//TODO: convert this localization file
const __ = (value) => {
    return value;
};

//TODO: convert this localization file
const _k = (value, value2) => {
    return value + value2;
};

const BT_SERVICE_ENDPOINT = 'https://127.0.0.1:8441/api/v1/bluetooth';

const SERVICE_NOT_AVAILABLE = function() {
    return _k('Bluetooth service is not available', 'method.bluetooth.service_is_not_available');
};

class BluetoothMethod extends React.PureComponent {
    state = {
        address: '',
        name: '',
        dataDirty: false,
        loading: true,
        devices: [],
        originalHash: '',
        data: ''
    };

    finishEnroll() {
        const {address, hash, name} = this.state.data;
        if (address !== '' && hash !== '' && name !== '') {
            return this.props.doEnrollWithBeginProcess({address, hash, name})
            .then((response) => {
                if (response.status !== 'FAILED') {
                    return Promise.resolve(response);
                }
                else {
                    throw response.msg;
                }
            });
        }
        else {
            return Promise.reject('No data input.');
        }
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    render() {
        const isEnrolled = this.props.template.isEnrolled;
        const data = this.props.template.data;

        const isEnrolledAvailable = this.state.devices && this.state.devices
            .map((d) => { return d.hash; })
            .indexOf(this.state.originalHash) > -1;
        const isEnrolledItemDirty = this.state.hasOwnProperty('originalHash') && this.data ? this.state.originalHash !== data.hash : false;
        const enrolledItem = (isEnrolled && !isEnrolledAvailable && !isEnrolledItemDirty) ?(
            <div className="ias-tags">
                <div className="ias-tag" tabIndex="0">
                    <span className="ias-tag-content device">
                        <i className="ias-icon ias-icon-help_thick" />
                        <span>
                        { (data && data.name) ? data.name : _('Unknown device')}
                        ({_('Enrolled, but not connected')})
                        </span>
                    </span>
                </div>
            </div>) : null;

        const show = this.state.loading;
        const indicator = show ? <img className="loading-img" alt="" src="/loading_anim_50.gif" /> : null;

        return (
            <Authenticator
                description="The bluetooth method authenticates using a secure bluetooth device."
                {...this.props}
            >
                <div className="bluetooth-method">
                <div className="ias-tags">
                    {this.state.devices.map((device) => {
                        return (
                            <div className="ias-tag" tabIndex="0" key={device.address} onClick={this.selectDevice.bind(this, device)}>
                                <span className="ias-tag-content device">
                                    {this.state.originalHash === device.hash ?
                                        <i className="ias-icon ias-icon-status_ok_fill" /> : <i className="ias-icon ias-icon-status_ok_thick" />}
                                    <span>
                                    {device.name ? device.name : _('Unknown device')}
                                    </span>
                                    <span>{this.state.originalHash === device.hash && isEnrolled ? _('(Enrolled)') : null}</span>

                                </span>
                            </div>
                        );
                    })}
                </div>
                {indicator}
                {enrolledItem}
                <div className="col-md-3 text-right">
                        <button className="ias-button btn-default"  disabled={this.state.loading}
                            onClick={this.handleRefresh}
                        >
                            <span>{_('Refresh')}</span>
                        </button>

                        <TestAuthenticatorButton {...this.props.test} />
                </div>
                </div>
            </Authenticator>
        );
    }

    deviceList = () => {
        const fetchOptions = {
            url: BT_SERVICE_ENDPOINT + '/getdevices',
            method: 'GET',
        };

       return jsonFetch(fetchOptions)
            .then(data => {
                console.log('getting the deviceList', data);
                if (data.devices) {
                    this.setState({
                        devices: data.devices
                    });
                }
                return data;
            })
            .catch((error) => {
                const {data, status, statusText, url} = error;
                console.log("catch error", error);
                this.props.showStatus(SERVICE_NOT_AVAILABLE(), STATUS_TYPE.ERROR);
            });
    };

    deviceListClear = () => {
        this.updateState();
        return Promise.resolve();
    }

    updateState = () => {
        this.setState({
            devices: []
        });
    }

    componentDidMount() {
        console.log("componentDidMount");

        const hash = this.props.template.data ? this.props.template.data.hash : null;
        this.setState({
            originalHash: hash
        });

        this.handleGetBlueTooth();
    }

    componentWillUnmount() {
    }

    selectDevice(device) {
        this.setState({
            data: device,
            dataDirty: true
        });
        if (!this.state.originalHash) {
            this.setState({
                originalHash: this.state.data.hash
            });
        }
    }

    hideSave = () => {
        return this.state.loading || !this.state.data.hash;
    }

    handleRefresh = () => {
        this.setState({
            loading: true
        });
        this.deviceListClear().then(() => {
            this.deviceList(this).then((data) => {
                console.log('Data is: ', data);
                this.setState({
                    loading: false,
                });

                if(data.devices) {
                    this.setState({
                        devices: data.devices
                    });
                }
            });
        });
    }

    handleGetBlueTooth = () => {
        console.log("handleGetBlueTooth");
        this.deviceListClear().then(() => {
            this.deviceList().then((data) => {

                console.log("getting the device list",data);
                if (data.result === 'BLUETOOTH_DISABLED') {
                    this.props.showStatus(_('Bluetooth is turned off'), STATUS_TYPE.WARN);
                } else if (data === undefined || data.status === undefined) {
                  this.props.showStatus(_('Select the device from the list to enroll or click test to check the enrolled device'), STATUS_TYPE.WARN);
                } else if (data.status === 'BT_OFF') {
                    this.props.showStatus(_('Bluetooth is turned off'), STATUS_TYPE.WARN);
                }

                let enrolledIndex = -1;
                if (data.devices !== undefined) {
                    enrolledIndex = data.devices.map(function(d)
                        { return d.hash; })
                        .indexOf(this.state.data.hash);
                }

                this.setState({
                    loading: false
                });

                if (enrolledIndex > -1) {
                    this.setState({
                        data: data.devices[enrolledIndex]
                    });
                }
            });
        });
    }
}

export default BluetoothMethod;

