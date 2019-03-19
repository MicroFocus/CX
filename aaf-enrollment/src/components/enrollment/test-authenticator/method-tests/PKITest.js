import React from 'react';
import ShowHidePassword from '../../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../../utils/form-handler';
import {pkiSignChallenge} from '../../../../api/pki';
import {STATUS_TYPE} from '../../../../ux/ux';
import CommonCardHandler from '../../../../api/commonCardHandler';

class GenericTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.pkiHandler = new CommonCardHandler(CommonCardHandler.PKI_SERVICE_URL, this.props.showStatus);

        generateFormChangeHandler(this, {
            pin: ''
        });

        this.pkiHandler.getStatus({
            onCard: () => {
                props.doTestLogon().then((result) => {
                    this.challengeData = result;
                    this.props.showStatus('Specify your PIN', STATUS_TYPE.INFO);
                });
            }
        });
    }

    finishTest = () => {
        const {challenge, keypairId: keypairid} = this.challengeData;
        const {pin} = this.state.form;
        pkiSignChallenge({challenge, pin, keypairid}).then((data) => {
            const {signature, padding, hash} = data;
            this.props.doTestLogon({signature, padding, hash});
        }).catch((errorMessage) => {
            this.props.markTestComplete(false, errorMessage);
        });
    };

    render() {
        return (
            <React.Fragment>
                <ShowHidePassword
                    autoFocus
                    name="pin"
                    onChange={this.handleChange}
                    placeholder="PIN"
                    value={this.state.form.pin}
                />
            </React.Fragment>
        );
    }
}

export default GenericTest;
