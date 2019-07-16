import PropTypes from 'prop-types';
import React from 'react';
import t from '../../../i18n/locale-keys';

export default function TestAuthenticatorButton({onClick, show}) {
    if (show) {
        return (
            <button className="ias-button" id="Test_Button" type="button" onClick={onClick}>
                {t.buttonTestMethod()}
            </button>
        );
    }

    return null;
}

TestAuthenticatorButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};
