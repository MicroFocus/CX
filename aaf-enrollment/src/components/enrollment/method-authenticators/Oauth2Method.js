import React from 'react';
import Authenticator from '../Authenticator';

class Oauth2Method extends React.PureComponent {
    authenticationInfoChanged() {
        return false;
    }

    render() {
        return (
            <Authenticator
                description="The Oauth2 method provides authentication via an external service."
                unenrollable
                {...this.props}
            />
        );
    }
}

export default Oauth2Method;
