import './Login.scss';
import {AUTHENTICATION_STATES} from '../../reducers/authentication.reducer';
import {
    authenticateUser, clearUser, loadLoginChains, selectLoginChainIndex, updateUsername
} from '../../actions/authentication.actions';
import {HOMEPAGE_URL, viewDashboard} from '../../actions/navigation.actions';
import {connect} from 'react-redux';
import React from 'react';
import {Menu} from '../../ux/ux';
import LoginMethodElements from './LoginMethodElements';
import {methods} from '../../data/MethodData';
import {Redirect } from 'react-router-dom';

class Login extends React.PureComponent {
    handleCancel = () => {
        this.props.clearUser();
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const authenticationStatus = this.props.authentication.status;
        if (authenticationStatus === AUTHENTICATION_STATES.USERNAME_ENTRY) {
            this.props.loadLoginChains(this.props.authentication.username);
        }
        else if (authenticationStatus === AUTHENTICATION_STATES.METHOD_AUTHENTICATION) {
            const {chains, chainIndex, loginFormData, methodIndex, username} = this.props.authentication;
            const methodId = chains[chainIndex].methods[methodIndex];
            this.props.authenticateUser(username, methodId, loginFormData);
        }
        else {
            console.error('Error! There is no action on the login page for a user already logged in!');
        }
    };

    handleUsernameChange = (event) => {
        this.props.updateUsername(event.target.value);
    };

    render() {
        let formElements;

        const authenticationStatus = this.props.authentication.status;
        if (authenticationStatus === AUTHENTICATION_STATES.UNINITIALIZED) {
            return null;
        }
        else if (authenticationStatus === AUTHENTICATION_STATES.USERNAME_ENTRY) {
            formElements = (
                <React.Fragment>
                    <div className="ias-input-container">
                        <input
                            autoFocus
                            name="username"
                            onChange={this.handleUsernameChange}
                            placeholder="Username"
                            type="text"
                            value={this.props.authentication.username}
                        />
                    </div>
                    <button className="ias-button">Next</button>
                </React.Fragment>
            );
        }
        else if (authenticationStatus === AUTHENTICATION_STATES.METHOD_AUTHENTICATION) {
            const {chains, chainIndex, methodIndex} = this.props.authentication;
            const selectedChain = chains[chainIndex];
            const methodId = selectedChain.methods ? selectedChain.methods[methodIndex] : null;
            const method = methods[methodId];

            // Show the chain and a chain selection dropdown if there are multiple chains to choose from
            let chainSelect = null;
            if (chains.length > 1) {
                const chainSelectElements = chains.map((chain, index) => {
                    const handleClick = () => this.props.selectLoginChainIndex(index);
                    return (
                        <button type="button" className="ias-button" key={chain.name} onClick={handleClick}>
                            {chain.name}
                        </button>
                    );
                });

                chainSelect = (
                    <Menu
                        toggleElement={(
                            <div className="chain-select" tabIndex="0">
                                <span>{selectedChain.name} Chain</span>
                                <i className="ias-icon ias-icon-down_thick" />
                            </div>
                        )}
                    >
                        <span>Select Chain</span>
                        {chainSelectElements}
                    </Menu>
                );
            }

            formElements = (
                <React.Fragment>
                    {chainSelect}
                    <div className="authentication-method">
                        <i className={`ias-icon ias-icon-${method.icon}`} />
                        <span>{method.methodTitle} method</span>
                    </div>
                    <LoginMethodElements handleCancel={this.handleCancel} methodId={methodId} />
                </React.Fragment>
            );
        }
        else if (authenticationStatus === AUTHENTICATION_STATES.LOGGED_IN) {
            // Don't save the login page in the history. User must log out to get back to it
            const routerState = this.props.location.state;
            if (routerState && routerState.referrer) {
                return <Redirect to={routerState.referrer} />;
            }
            else {
                return <Redirect to={HOMEPAGE_URL} />;
            }
        }
        else {
            console.error('Error! There is no view on the login page for this authentication state!');
        }

        return (
            <div className="ias-content-padding">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    {formElements}
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({authentication}) => ({authentication});
const mapDispatchToProps = {
    authenticateUser,
    clearUser,
    loadLoginChains,
    selectLoginChainIndex,
    updateUsername,
    viewDashboard
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
