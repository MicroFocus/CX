import Authenticator from '../Authenticator';
import {StatusIndicator} from '../../../ux/ux';
import React from 'react';
import {STATUS_TYPE} from '../../../ux/StatusIndicator';

class DeviceAuthMethod extends React.PureComponent {
    render() {
        return (
            <Authenticator
                description="Error! This method is not implemented"
                {...this.props}
            >
                <StatusIndicator type={STATUS_TYPE.ERROR}>
                    This method not implemented!
                </StatusIndicator>
            </Authenticator>
        );
    }
}

export default DeviceAuthMethod;
