import React from 'react';
import Authenticator from '../Authenticator';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class LDAPPasswordMethod extends React.PureComponent {
    authenticationInfoSavable() {
        return !this.props.template.isEnrolled;
    }

    authenticationInfoChanged() {
        return false;
    }

    finishEnroll() {
        return this.props.doEnrollWithBeginProcess()
            .then((response) => {
                if (response.status !== 'FAILED') {
                    return Promise.resolve(response);
                }
                else {
                    throw response.msg;
                }
            });
    };

    render() {
        return (
            <Authenticator
                description="The LDAP password is your corporate password. NetIQ Advanced Authentication automatically
                            enrolls your LDAP password."
                {...this.props}
            >
                <TestAuthenticatorButton {...this.props.test} />
            </Authenticator>
        );
    }
}

export default LDAPPasswordMethod;
