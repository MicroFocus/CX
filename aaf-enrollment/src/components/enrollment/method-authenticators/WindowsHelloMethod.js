import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import {winHelloEnroll} from '../../../api/devices/windows-hello-device.api';
import {STATUS_TYPE} from '../../../ux/ux';
import TextField from '../../TextField';
import t from '../../../i18n/locale-keys';

class WindowsHelloMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {template} = props;
        let accountName = '';
        if (template.isEnrolled && template.data) {
            accountName = template.data.accountName;
        }
        generateFormChangeHandler(this, { accountName }, {
            allowChange: true
        });

        // Pre-populate the account name if user is from AD repository
        this.props.registerPromise(
            this.props.getWinHelloInfo()
        ).then((data) => {
            const {isAdUser, accountName} = data;
            const newState = { isAdUser };
            if (!template.isEnrolled) {
                newState.form = { ...this.state.form, accountName };
            }
            this.setState(newState);
        });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return this.authenticationInfoChanged()
            || (!this.props.template.isEnrolled && !!this.state.form.accountName);
    }

    finishEnroll() {
        const {accountName} = this.state.form;
        if (!accountName.length) {
            return Promise.reject(t.winHelloUsernameRequired());
        }

        this.props.showStatus(t.waitPlease(), STATUS_TYPE.INFO);

        return this.props.registerPromise(
            winHelloEnroll({userName: accountName})
        ).then((data) => {
            const {id, publickey: pkey, userSid} = data;
            const enrollData = {pkey, id, userSid, accountName};
            return this.props.doEnrollWithBeginProcess(enrollData);
        }).then((response) => {
            if (response.status !== 'FAILED') {
                return Promise.resolve(response);
            }
            else {
                throw response.msg;
            }
        });
    }

    render() {
        const {allowSpecifyUsername} = this.props.policies.winHelloMethod.data;
        const allowChange = this.state.isAdUser ? allowSpecifyUsername : true;

        return (
            <Authenticator
                description={t.winHelloMethodDescription()}
                {...this.props}
            >
                <TextField
                    disabled={!allowChange || this.props.readonlyMode}
                    id="account_name"
                    label={t.winHelloUserName()}
                    name="accountName"
                    onChange={this.handleChange}
                    value={this.state.form.accountName}
                />
            </Authenticator>
        );
    }
}

export default WindowsHelloMethod;
