import {AUTHENTICATION_STATES} from '../reducers/authentication.reducer';
import {connect} from 'react-redux';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {LoadingIndicator} from '../ux/ux';
import t from '../i18n/locale-keys';

const PrivateRoute = ({ authenticationStatus, component: Component, render, signOutInProcess, ...rest }) => (
    <Route {...rest} render={props => {
        switch (authenticationStatus) {
            case AUTHENTICATION_STATES.LOGGED_IN:
                if (Component) {
                    return <Component {...props} />;
                }
                else {
                    return render(props);
                }
            case AUTHENTICATION_STATES.UNINITIALIZED:
                return <LoadingIndicator message={t.loading()} />;
            default:
                // Redirect logged-out users to the login page. We want to make it easy for them to access the current
                // page once they have logged in. If they logged out intentionally, they can do this via the browser
                // Back button. Otherwise we redirect them to the current page once they login.
                if (signOutInProcess) {
                    return <Redirect push to="/login" />;
                }
                else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { referrer: props.location }
                            }}
                        />
                    );
                }
        }
    }}
    />
);

const mapStateToProps = ({
    authentication: {status},
    navigation: {signOutInProcess}
}) => ({
    authenticationStatus: status,
    signOutInProcess
});

export default connect(mapStateToProps)(PrivateRoute);
