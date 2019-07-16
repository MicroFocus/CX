import './polyfills';
import '@microfocus/ux-ias/dist/ux-ias.css';
import '@microfocus/ias-icons/dist/ias-icons.css';
import './index.scss';
import App from './components/App';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {loadStorageItem, storageItems} from './utils/local-storage';
import {loadLoginSession} from './actions/authentication.actions';
import * as types from './actions/action-types';
require('qrcodejs/qrcode.min.js');  // Needed to generate QR codes. Loads in global scope via webpack script-loader.

// Use redux-logger only if specified in environment. Code here that will not be used is excluded from build via
// Webpack define plugin - see https://webpack.js.org/plugins/define-plugin/#usage
let middleware = null;
if (process.env.REACT_APP_LOGGING) {
    const logger = require('redux-logger').createLogger({collapsed: true});
    middleware = applyMiddleware(thunk, logger);
}
else {
    middleware = applyMiddleware(thunk);
}

const store = createStore(rootReducer, middleware);

const loginSessionId = loadStorageItem(storageItems.LOGIN_SESSION_ID);
if (loginSessionId) {
    loadLoginSession(loginSessionId)(store.dispatch, store.getState);
}
else {
    store.dispatch({type: types.CLEAR_USER_INFO});
}

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
