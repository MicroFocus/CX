import React from 'react';
import {STATUS_TYPE} from '../../../../ux/ux';
import {captureFingerprint} from '../../../../api/devices/fingerprint-device.api';
import t from '../../../../i18n/locale-keys';

class GenericTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setTestButtonAvailability(false);
        this.props.showStatus(t.fingerPlace(), STATUS_TYPE.INFO);

        this.props.registerPromise(
                captureFingerprint()
            )
            .then((capture) => {
                this.props.doTestLogon({capture}, true);
            })
            .catch((error) => {
                this.props.markTestComplete(false, error);
            });
    }

    render() {
        return null;
    }
}

export default GenericTest;
