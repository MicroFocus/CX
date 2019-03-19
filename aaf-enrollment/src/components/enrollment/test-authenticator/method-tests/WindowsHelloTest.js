import React from 'react';
import {STATUS_TYPE} from '../../../../ux/ux';
import {winHelloLogon} from '../../../../api/windows-hello';

class GenericTest extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props.setTestButtonAvailability(false);

        const {doTestLogon, markTestComplete, showStatus} = props;
        doTestLogon(null).then(({challenge}) => {
            if (challenge) {
                showStatus('Please authenticate with Windows Hello', STATUS_TYPE.INFO);
                return winHelloLogon({ challenge });
            }
            else {
                markTestComplete(false, 'No challenge provided from server.');
            }
        }).then((data) => {
            showStatus('Please wait', STATUS_TYPE.INFO);
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
