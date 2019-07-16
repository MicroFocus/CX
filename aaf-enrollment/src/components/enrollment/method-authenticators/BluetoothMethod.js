import './BluetoothMethod.scss';
import React from 'react';
import Authenticator from '../Authenticator';
import {STATUS_TYPE} from '../../../ux/ux';
import t from '../../../i18n/locale-keys';
import {bluetoothGetDevices} from '../../../api/devices/bluetooth-devices.api';

class BluetoothMethod extends React.PureComponent {
    state = {
        dataDirty: false,
        devices: [],
        loading: false,
        selectedDevice: null
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    componentDidMount() {
        this.getDevices();
    }

    findDeviceWithHash(devices, hash) {
        let device;
        for (let deviceIndex = 0; deviceIndex < devices.length; deviceIndex++) {
            device = devices[deviceIndex];
            if (device.hash === hash) {
                return device;
            }
        }

        return null;
    }

    finishEnroll() {
        const {address, hash, name} = this.state.selectedDevice;
        return this.props.doEnrollWithBeginProcess({address, hash, name})
            .then((response) => {
                if (response.status !== 'FAILED') {
                    return Promise.resolve(response);
                }
                else {
                    throw response.msg;
                }
            });
    };

    getDevices = () => {
        this.setState({
            devices: [],
            loading: true
        });

        this.props.registerPromise(
                bluetoothGetDevices()
            ).then(({devices}) => {
                if (!devices) {
                    return Promise.reject(t.bluetoothServiceError());
                }

                this.setState({loading: false});

                if (this.props.readonlyMode) {
                    return;
                }

                this.updateDeviceList(devices);
            }).catch((error) => {
                this.setState({loading: false});

                // Different error types: .msg (server), .message (JS exception), string (application threw)
                const message = error.msg || error.message || error;
                this.props.showStatus(message, STATUS_TYPE.ERROR);
            });
    };

    selectDevice(device) {
        this.setState({
            selectedDevice: device,
            dataDirty: true
        });
    }

    updateDeviceList(devices) {
        if (devices.length) {
            this.props.showStatus(t.bluetoothSelectDevice(), STATUS_TYPE.INFO);
        }
        else {
            this.props.showStatus(t.bluetoothNoDevices(), STATUS_TYPE.ERROR);
            return;
        }

        // Update selected device info to match data received, if the same device is found
        let selectedDevice = this.state.selectedDevice;
        if (selectedDevice) {
            const updatedSelectedDevice = this.findDeviceWithHash(devices, selectedDevice.hash);
            if (updatedSelectedDevice) {
                selectedDevice = updatedSelectedDevice;
            }
        }

        // Add the enrolled device, if not found in data received.
        // If it is found in data received, mark it as enrolled; if no device is selected, select the enrolled device.
        const {data, isEnrolled} = this.props.template;
        if (isEnrolled) {
            const enrolledDevice = this.findDeviceWithHash(devices, data.hash);
            if (!enrolledDevice) {
                devices.push({
                    ...data,
                    enrolled: true,
                    undetected: true
                });
            }
            else {
                enrolledDevice.enrolled = true;
                if (!selectedDevice) {
                    selectedDevice = enrolledDevice;
                }
            }
        }

        // Update state
        const newState = {devices};
        if (selectedDevice) {
            newState.selectedDevice = selectedDevice;
        }
        this.setState(newState);
    }

    renderDeviceListItem(device) {
        const {hash, name, enrolled, undetected} = device;
        const {selectedDevice} = this.state;

        const tagName = name || t.unknownDevice();

        let iconName;
        let info;
        if (enrolled && undetected) {
            iconName = 'help_thick';
            info = t.bluetoothEnrolledUnconnected();
        }
        else {
            const deviceIsSelected = selectedDevice && (hash === selectedDevice.hash);
            if (deviceIsSelected) {
                iconName = 'status_ok_fill';
            }
            else {
                iconName = 'control_stop_thick';
            }
            info = enrolled ? t.bluetoothEnrolled() : null;
        }

        const canSelect = (!this.props.readonlyMode && !undetected);
        const onClick = canSelect ? () => this.selectDevice(device) : null;
        const tabIndex = canSelect ? '0' : null;
        const onKeyPress = canSelect ? (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                onClick();
            }
        } : null;

        const tagClass = 'ias-tag' + (!canSelect ? ' ias-disabled' : '');

        return (
            <div className={tagClass} key={hash} onClick={onClick} onKeyPress={onKeyPress} tabIndex={tabIndex}>
                <span className="ias-tag-content">
                    <i className={`ias-icon ias-icon-${iconName}`} />
                    <span>{tagName}</span>
                    <span>{info}</span>
                </span>
            </div>
        );
    }

    renderDeviceList() {
        const deviceElements = this.state.devices.map((device) => this.renderDeviceListItem(device));

        return (
            <div className="bluetooth-device-list">
                <div className="ias-tags">
                    {deviceElements}
                </div>
            </div>
        );
    }

    render() {
        const deviceList = this.renderDeviceList();
        let loadingIndicator = null;
        if (this.state.loading) {
            loadingIndicator = (
                <div className="bluetooth-loading-img">
                    <img
                        alt={t.loading()}
                        className="loading-img"
                        src={process.env.PUBLIC_URL + '/loading_anim_50.gif'}
                    />
                </div>
            );
        }

        return (
            <Authenticator
                description={t.bluetoothMethodDescription()}
                {...this.props}
            >
                {deviceList}
                {loadingIndicator}
                <button
                    className="ias-button"
                    disabled={this.state.loading}
                    id="Get_Devices_Button"
                    onClick={this.getDevices}
                    type="button"
                >
                    {t.bluetoothGetDevices()}
                </button>
            </Authenticator>
        );
    }
}

export default BluetoothMethod;
