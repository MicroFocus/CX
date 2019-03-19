import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class RadiusMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {isEnrolled, data} = props.template;
        let userName = '';
        if (isEnrolled && data) {
            userName = data.userName || '';
        }
        generateFormChangeHandler(this, { userName });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return true;
    }

    finishEnroll() {
        const {userName} = this.state.form;
        const formData = userName.length ? { userName } : null;

        return this.props.doEnrollWithBeginProcess(formData)
        .then((response) => {
            if (response.status !== 'FAILED') {
                return Promise.resolve(response);
            }
            else {
                throw response.msg;
            }
        });
    }

    render() {
        const {username} = this.props.authentication;

        return (
            <Authenticator
                description="The Radius Client method forwards your authentication request to a Radius server."
                {...this.props}
            >
                <div className="override">
                    <div>
                        <label>Your user name</label>
                        <span className="directory-data">{username}</span>
                    </div>
                    <div>
                        <label>(from corporate directory)</label>
                    </div>
                    <div>
                        <label>To override for this method, enter Override User Name</label>
                    </div>
                </div>
                <div className="ias-input-container">
                    <label htmlFor="Radius_Input_Field">Override User Name</label>
                    <input id="Radius_Input_Field"
                           name="userName"
                           placeholder="User name"
                           onChange={this.handleChange}
                           value={this.state.form.userName}
                           type="text"
                    />
                    <TestAuthenticatorButton {...this.props.test} />
                </div>
            </Authenticator>
        );
    }
}

export default RadiusMethod;
