import React from 'react';
import ShowHidePassword from '../../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../../utils/form-handler';
import {pkiSignChallenge} from '../../../../api/devices/pki-device.api';
import {STATUS_TYPE} from '../../../../ux/ux';
import CommonCardHandler from '../../../../api/devices/common-card-devices.api';
import t from '../../../../i18n/locale-keys';

class GenericTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.pkiHandler = new CommonCardHandler(CommonCardHandler.PKI_SERVICE_URL, props.showStatus,
            props.registerPromise);

        generateFormChangeHandler(this, {
            pin: ''
        });

        this.pkiHandler.getStatus({
            onCard: () => {
                props.doTestLogon().then((result) => {
                    this.challengeData = result;
                    this.props.showStatus(t.pkiSpecifyPin(), STATUS_TYPE.INFO);
                });
            }
        });
    }

    componentWillUnmount() {
        this.pkiHandler.abortCardPromise();
    }

    finishTest = () => {
        const {challenge, keypairId: keypairid} = this.challengeData;
        const {pin} = this.state.form;
        this.props.registerPromise(
            pkiSignChallenge({challenge, pin, keypairid})
        ).then((data) => {
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
                    placeholder={t.pkiPin()}
                    value={this.state.form.pin}
                />
            </React.Fragment>
        );
    }
}

export default GenericTest;
