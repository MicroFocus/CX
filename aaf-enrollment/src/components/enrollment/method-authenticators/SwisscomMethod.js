import React from 'react';
import Authenticator from '../Authenticator';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

class SwisscomMethod extends React.PureComponent {
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
        const userMobilePhone = this.props.authentication.userMobilePhone || 'unknown';

        const description = 'The Swisscom Mobile ID method generates a request to your mobile phone. The mobile ' +
            'number where a request is sent is: ' + userMobilePhone;

        return (
            <Authenticator
                description={description}
                {...this.props}
            >
                <TestAuthenticatorButton {...this.props.test} />
            </Authenticator>
        );
    }
}

export default SwisscomMethod;
