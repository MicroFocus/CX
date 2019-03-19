import React from 'react';
import {STATUS_TYPE, StatusIndicator} from '../../../../ux/ux';

class GenericTest extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <StatusIndicator type={STATUS_TYPE.ERROR}>
                    This test has not yet been implemented!
                </StatusIndicator>
            </React.Fragment>
        );
    }
}

export default GenericTest;
