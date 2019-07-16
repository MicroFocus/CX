import PropTypes from 'prop-types';
import React from 'react';
import './ShowHidePassword.scss';
import TextField from './TextField';
import t from '../i18n/locale-keys';

export default class ShowHidePassword extends React.PureComponent {
    state = {
        passwordVisible: false
    };

    showHidePassword = () => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        });
    };

    render() {
        const {autoFocus, disabled, label, name, onChange, placeholder, value} = this.props;

        if (disabled) {
            return (
                <TextField
                    disabled
                    id={this.props.id}
                    label={label}
                    placeholder={placeholder}
                    value="*****"
                />
            );
        }

        const id = this.props.id || name;
        const {passwordVisible} = this.state;
        const labelElement = label ? <label htmlFor={id}>{label}</label> : null;
        const passwordInputType = passwordVisible ? 'text' : 'password';
        const buttonStyle = passwordVisible ? {color: 'red'} : null;
        const buttonIcon = passwordVisible ? 'unlock_thick' : 'lock_thick';

        return (
            <div className="ias-input-container show-hide-password">
                {labelElement}
                <input
                    autoComplete="off"
                    autoFocus={autoFocus}
                    id={id}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={passwordInputType}
                    value={value}
                />
                <button
                    className="ias-button ias-icon-button"
                    disabled={!value}
                    title={t.showHidePasswordLabel()}
                    onClick={this.showHidePassword}
                    style={buttonStyle}
                    type="button"
                >
                    <i className={'ias-icon ias-icon-' + buttonIcon} />
                </button>
            </div>
        );
    }
}

ShowHidePassword.defaultProps = {
    autoFocus: false,
    disabled: false,
    placeholder: ''
};

ShowHidePassword.propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired
};
