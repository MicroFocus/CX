import React from 'react';
import CommonCardHandler from '../../../../api/devices/common-card-devices.api';

class CardTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setTestButtonAvailability(false);

        this.commonCardHandler = new CommonCardHandler(CommonCardHandler.CARD_SERVICE_URL, props.showStatus,
            props.registerPromise);

        this.commonCardHandler.getStatus({
            onCard: (data) => this.props.doTestLogon(data)
        });
    }

    componentWillUnmount() {
        this.commonCardHandler.abortCardPromise();
    }

    render() {
        return null;
    }
}

export default CardTest;
