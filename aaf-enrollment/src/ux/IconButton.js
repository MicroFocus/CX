import React from 'react';
import PropTypes from 'prop-types';

const IconButton = ({className, icon, id, onClick, title}) => {
    let buttonClass = 'ias-button ias-icon-button';
    if (className) {
        buttonClass += ' ' + className;
    }
    return (
        <button
            className={buttonClass}
            id={id}
            onClick={onClick}
            title={title}
            type="button"
        >
            <i className={`ias-icon ias-icon-${icon}`} />
        </button>
    );
};

IconButton.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    id: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default IconButton;
