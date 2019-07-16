import React from 'react';
import {STATUS_TYPE} from '../../../../ux/StatusIndicator';
import {StatusIndicator} from '../../../../ux/ux';

class DeviceAuthTest extends React.PureComponent {
    render() {
        return (
            <StatusIndicator type={STATUS_TYPE.ERROR}>
                This method not implemented!
            </StatusIndicator>
        );
    }
}

export default DeviceAuthTest;
