import PropTypes from 'prop-types';
import React from 'react';

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
        const {autoFocus, label, name, onChange, placeholder, value} = this.props;
        const id = this.props.id || name;
        const {passwordVisible} = this.state;

        const labelElement = label ? <label htmlFor={id}>{label}</label> : null;
        const passwordInputType = passwordVisible ? 'text' : 'password';
        const showHidePasswordStyle = passwordVisible ? {color: 'red'} : null;
        const showHidePasswordIcon = passwordVisible ? 'unlock_thick' : 'lock_thick';

        return (
            <div className="ias-input-container">
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
                    className="ias-button ias-icon-button show-hide-password"
                    title="Show/Hide Password or PIN"
                    onClick={this.showHidePassword}
                    style={showHidePasswordStyle}
                    type="button"
                >
                    <i className={'ias-icon ias-icon-' + showHidePasswordIcon} />
                </button>
                {this.props.children}
            </div>
        );
    }
}

ShowHidePassword.defaultProps = {
    autoFocus: false,
    placeholder: ''
};

ShowHidePassword.propTypes = {
    autoFocus: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired
};
