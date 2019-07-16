import React from 'react';
import PropTypes from 'prop-types';

// Shows a text input field.
// - If disabled is true, it will show a label and text instead.
// - When disabled, empty values are represented by "---"
export default function TextField(props) {
    const {autoComplete, autoFocus, disabled, label, name, onChange, placeholder, value} = props;
    const id = props.id || name;
    let content;

    if (disabled) {
        content = (
            <label>
                {label || placeholder}
                <span>{value || '---'}</span>
            </label>
        );
    }
    else {
        const labelElement = label ? <label htmlFor={id}>{label}</label> : null;

        content = (
            <React.Fragment>
                {labelElement}
                <input
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    id={id}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    type="text"
                    value={value}
                />
            </React.Fragment>
        );
    }

    return <div className="ias-input-container">{content}</div>;
}

TextField.defaultProps = {
    autoFocus: false,
    disabled: false,
    placeholder: '',
    type: 'text'
};

TextField.propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.any.isRequired
};
