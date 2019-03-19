import PropTypes from 'prop-types';
import React from 'react';
import ShowHidePassword from '../ShowHidePassword';
import {methodIds} from '../../data/MethodData';
import {updateLoginFormData} from '../../actions/authentication.actions';
import {connect} from 'react-redux';

class LoginMethodElements extends React.PureComponent {
    handleChange = (event) => {
        const inputName = event.target.name;
        const value = event.target.value;
        if (!inputName) {
            console.error('Can\'t add changes to an input with no name in the state');
            return;
        }

        this.props.updateLoginFormData(inputName, value);
    };

    render() {
        const {handleCancel, loginFormData, methodId} = this.props;
        switch (methodId) {
            case methodIds.PASSWORD:
                return (
                    <React.Fragment>
                        <ShowHidePassword
                            autoFocus
                            name="answer"
                            onChange={this.handleChange}
                            placeholder="Password"
                            value={loginFormData.answer}
                        />
                        <button className="ias-button">Next</button>
                        <button className="ias-button" onClick={handleCancel} type="button">Cancel</button>
                    </React.Fragment>
                );
            case methodIds.LDAP_PASSWORD:
                return (
                    <React.Fragment>
                        <ShowHidePassword
                            autoFocus
                            name="answer"
                            onChange={this.handleChange}
                            placeholder="Password"
                            value={loginFormData.answer}
                        />
                        <button className="ias-button">Next</button>
                        <button className="ias-button" onClick={handleCancel} type="button">Cancel</button>
                    </React.Fragment>
                );
            default:
                console.error(`Error! Authentication method of ${methodId} doesn't exist!`);
                return null;
        }
    }
}

LoginMethodElements.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    loginFormData: PropTypes.object,
    methodId: PropTypes.string.isRequired
};

const mapStateToProps = ({authentication: {loginFormData}}) => ({loginFormData});
const mapDispatchToProps = { updateLoginFormData };

export default connect(mapStateToProps, mapDispatchToProps)(LoginMethodElements);


export function generateEmptyLoginFormData(methodId) {
    switch (methodId) {
        case methodIds.PASSWORD:
            return { answer: '' };
        case methodIds.LDAP_PASSWORD:
            return { answer: '' };
        default:
            console.error(`Error! Authentication method of ${methodId} doesn't exist!`);
            return {};
    }
}
