import StatusIndicator from '../../ux/StatusIndicator';
import React from 'react';
import PropTypes from 'prop-types';

function AuthenticatorStatus({statusMessage}) {
    if (!statusMessage) {
        return null;
    }

    return (
        <StatusIndicator type={statusMessage.type}>
            {statusMessage.description}
        </StatusIndicator>
    );
}

AuthenticatorStatus.propTypes = {
    statusMessage: PropTypes.shape({
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    })
};

export default AuthenticatorStatus;
