import React from 'react';
import CommonCardHandler from '../../../../api/commonCardHandler';

class CardTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setTestButtonAvailability(false);

        this.commonCardHandler = new CommonCardHandler(CommonCardHandler.CARD_SERVICE_URL, this.props.showStatus);
        this.readCardAndSubmitAuth();
    }

    readCardAndSubmitAuth() {
        this.commonCardHandler.getStatus(
            {
                onCard: (data) => {
                    this.props.doTestLogon(data); }
            });
    }

    componentWillUnmount() {
        this.commonCardHandler.abort();
    }

    render() {
        return null;
    }
}

export default CardTest;
