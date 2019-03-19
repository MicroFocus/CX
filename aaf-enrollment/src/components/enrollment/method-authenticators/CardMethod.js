import React from 'react';
import Authenticator from '../Authenticator';
import CommonCardHandler from '../../../api/commonCardHandler';
import {STATUS_TYPE} from '../../../ux/ux';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class CardMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.commonCardHandler = new CommonCardHandler(CommonCardHandler.CARD_SERVICE_URL, this.props.showStatus);

        this.state = {
            data: {
                cardUid: '',
                cardCert: ''
            },
            disableActions: false,
            status: '',
            dataDirty: false
        };
    }

    doEnroll() {
        this.setState({dataDirty: true});
        this.commonCardHandler.getStatus(
            {
                enroll: true,
                onCard: (data) => {
                    console.log('doEnrollWithBeginProcess', data);
                    this.setState(data);
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

    finishEnroll() {
        if (this.props.enrollProcessComplete()) {
            return Promise.resolve();
        }
        else {
             return Promise.reject('Enrollment process not complete.');
        }
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    handleScanClick = () => {
        this.doEnroll();
    };

    componentWillUnmount() {
        this.commonCardHandler.abort();
    }

    render() {
        return (
            <Authenticator
                description="The Card method uses a digital card with an entered PIN or
                password. The card info and PIN are stored in NetIQ Advanced Authentication not connected
                to your corporate directory."
                {...this.props}
            >
                <button className="ias-button" onClick={this.handleScanClick} type="button">Scan Card</button>
                <TestAuthenticatorButton {...this.props.test} />
            </Authenticator>
        );
    }
}

export default CardMethod;
