import React from 'react';
import {STATUS_TYPE} from '../../../../ux/ux';
import {winHelloLogon} from '../../../../api/devices/windows-hello-device.api';
import t from '../../../../i18n/locale-keys';

class GenericTest extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props.setTestButtonAvailability(false);

        const {doTestLogon, markTestComplete, showStatus} = props;
        doTestLogon(null).then(({challenge}) => {
            if (challenge) {
                showStatus(t.winHelloAuthenticate(), STATUS_TYPE.INFO);
                return this.props.registerPromise(
                    winHelloLogon({ challenge })
                );
            }
            else {
                markTestComplete(false, t.winHelloNoChallenge());
            }
        }).then((data) => {
            showStatus(t.waitPlease(), STATUS_TYPE.INFO);
            const {signature, id, userSid} = data;
            const logonData = {signature, id, userSid};
            doTestLogon(logonData);
        }).catch((errorMessage) => {
            markTestComplete(false, errorMessage);
        });
    }

    render() {
        return null;
    }
}

export default GenericTest;
