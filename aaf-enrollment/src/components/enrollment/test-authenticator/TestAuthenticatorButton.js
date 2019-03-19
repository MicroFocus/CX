import PropTypes from 'prop-types';
import React from 'react';

export default function TestAuthenticatorButton({onClick, show}) {
    if (show) {
        return (
            <button className="ias-button" id="testAuthenticatorButton" type="button" onClick={onClick}>
                Test Method
            </button>
        );
    }

    return null;
}

TestAuthenticatorButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};
