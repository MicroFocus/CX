import React from 'react';
import {STATUS_TYPE} from '../../../../ux/ux';
import {getU2FOriginFromUrl, u2fParseError, u2fSign}
    from '../../../../api/devices/u2f-device.api';
import t from '../../../../i18n/locale-keys';

class U2FTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setTestButtonAvailability(false);
        const appId = getU2FOriginFromUrl(window.location.href);

        this.props.doTestLogon({appId})
            .then((response) => {
                if (response.status === 'MORE_DATA') {
                    this.props.showStatus(t.u2fWaitingFor(), STATUS_TYPE.INFO);

                    return this.props.registerPromise(
                            u2fSign(response.signRequests)
                        );
                }
                else {
                    return Promise.reject(response);
                }
            }).then((u2fResponse) => {
                this.props.doTestLogon({signResponse: u2fResponse}, true);
            }).catch((error) => {
                const message = u2fParseError(error);
                this.props.markTestComplete(false, message);
            });
    }

    render() {
        return null;
    }
}

export default U2FTest;
