import React from 'react';
import Authenticator from '../Authenticator';
import t from '../../../i18n/locale-keys';

class LDAPPasswordMethod extends React.PureComponent {
    authenticationInfoChanged() {
        return false;
    }

    authenticationInfoSavable() {
        return !this.props.template.isEnrolled;
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
                description={t.ldapMethodDescription()}
                {...this.props}
            />
        );
    }
}

export default LDAPPasswordMethod;
