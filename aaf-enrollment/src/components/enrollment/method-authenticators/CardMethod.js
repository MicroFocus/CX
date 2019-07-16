import React from 'react';
import Authenticator from '../Authenticator';
import CommonCardHandler from '../../../api/devices/common-card-devices.api';
import {STATUS_TYPE} from '../../../ux/ux';
import t from '../../../i18n/locale-keys';

class CardMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.commonCardHandler = new CommonCardHandler(CommonCardHandler.CARD_SERVICE_URL, props.showStatus,
            props.registerPromise);

        this.state = {dataDirty: false};
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return false;
    }

    componentWillUnmount() {
        this.commonCardHandler.abortCardPromise();
    }

    scanCard = () => {
        this.setState({dataDirty: true});
        this.commonCardHandler.getStatus({
            enroll: true,
            onCard: (data) => {
                this.props.doEnrollWithBeginProcess(data)
                    .then((response) => {
                        if (response.status === 'OK') {
                            this.props.showStatus(response.msg, STATUS_TYPE.OK);
                        }
                        else if (response.status === 'FAILED') {
                             this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
                        }
                        else {
                            this.props.showStatus(response.msg, STATUS_TYPE.INFO);
                        }
                    });
            }
        });
    };

    render() {
        return (
            <Authenticator
                description={t.cardMethodDescription()}
                {...this.props}
            >
                <button
                    className="ias-button"
                    disabled={this.props.readonlyMode || this.state.dataDirty}
                    id="Scan_Card_Button"
                    onClick={this.scanCard}
                    type="button"
                >
                    {t.cardScan()}
                </button>
            </Authenticator>
        );
    }
}

export default CardMethod;
