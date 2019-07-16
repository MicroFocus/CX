import React from 'react';
import Authenticator from '../Authenticator';
import t from '../../../i18n/locale-keys';

class Oauth2Method extends React.PureComponent {
    authenticationInfoChanged() {
        return false;
    }

    render() {
        return (
            <Authenticator
                description={t.oauth2MethodDescription()}
                unenrollable
                {...this.props}
            />
        );
    }
}

export default Oauth2Method;
