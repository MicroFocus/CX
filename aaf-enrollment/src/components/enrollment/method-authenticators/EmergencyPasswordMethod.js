import React from 'react';
import Authenticator from '../Authenticator';
import t from '../../../i18n/locale-keys';

class EmergencyPasswordMethod extends React.PureComponent {
    authenticationInfoChanged() {
        return false;
    }

    render() {
        return (
            <Authenticator
                description={t.emergencyPwMethodDescription()}
                unenrollable
                {...this.props}
            />
        );
    }
}

export default EmergencyPasswordMethod;
