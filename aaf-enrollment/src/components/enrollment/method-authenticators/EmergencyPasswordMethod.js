import React from 'react';
import Authenticator from '../Authenticator';

class EmergencyPasswordMethod extends React.PureComponent {
    authenticationInfoChanged() {
        return false;
    }

    render() {
        return (
            <Authenticator
                description="The Emergency Password method allows for a specific
                    number of sign-ins. It is a password stored in NetIQ Advanced Authentication
                    not connected to your corporate directory. This can be a PIN or a simple password."
                unenrollable
                {...this.props}
            />
        );
    }
}

export default EmergencyPasswordMethod;
