import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';
import {winHelloEnroll} from '../../../api/windows-hello';
import {STATUS_TYPE} from '../../../ux/ux';

class WindowsHelloMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {template} = props;
        let accountName = '';
        if (template.isEnrolled && template.data) {
            accountName = template.data.accountName;
        }
        generateFormChangeHandler(this, { accountName });

        // TODO: windows_hello.js:80 - pre populate the account name if logged in user is from AD repo.
    }

    finishEnroll() {
        const {accountName} = this.state.form;
        if (!accountName.length) {
            return Promise.reject('Please enter user name');
        }

        this.props.showStatus('Please wait', STATUS_TYPE.INFO);

        return winHelloEnroll({
            userName: accountName
        }).then((data) => {
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

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    render() {
        return (
            <Authenticator
                description="The Windows Hello method authenticates using the Windows Hello service.
                    Your computer must use the Windows operating system to use this method."
                {...this.props}
            >
                <div className="ias-input-container">
                    {/*TODO: disable change input if !allow_change*/}
                    <input
                        id="account_name"
                        name="accountName"
                        onChange={this.handleChange}
                        placeholder="Windows User Name"
                        type="text"
                        value={this.state.form.accountName}
                    />
                </div>
                <TestAuthenticatorButton {...this.props.test} />
            </Authenticator>
        );
    }
}

export default WindowsHelloMethod;
