import * as types from '../actions/action-types';
import {produce} from 'immer';
import {generateEmptyLoginFormData} from '../components/login/LoginMethodElements';

export const AUTHENTICATION_STATES = {
    LOGGED_IN: 'LOGGED_IN',
    METHOD_AUTHENTICATION: 'METHOD_AUTHENTICATION',
    UNINITIALIZED: 'UNINITIALIZED',
    USERNAME_ENTRY: 'USERNAME_ENTRY'
};

const defaultState = {
    chains: null,
    chainIndex: 0,
    loginFormData: {},
    loginSessionId: null,
    methodIndex: 0,
    status: AUTHENTICATION_STATES.USERNAME_ENTRY,
    userId: '',
    username: ''    // The API uses user_name and username; username is more common, so we use this convention here
};

const initialState = {...defaultState, status: AUTHENTICATION_STATES.UNINITIALIZED};

const authenticationReducer = (state = initialState, action) => produce(state, draft => {
    let methods;
    switch (action.type) {
        case types.AUTHENTICATE_USER_SUCCESS:
            methods = draft.chains[draft.chainIndex].methods;
            if (draft.methodIndex + 1 < methods.length) {
                draft.loginFormData = generateEmptyLoginFormData(methods[draft.methodIndex + 1]);
                draft.methodIndex++;
            }
            else {
                draft.chainIndex = 0;
                draft.loginFormData = {};
                draft.methodIndex = 0;
                draft.loginSessionId = action.result.loginSessionId;
                draft.status = AUTHENTICATION_STATES.LOGGED_IN;
                draft.username = action.result.userName;
                draft.userEmail = action.result.userEmail;
                draft.userId = action.result.userId;
                draft.userMobilePhone = action.result.userMobilePhone;
            }
            return;
        case types.CLEAR_USER_INFO:
            return defaultState;
        case types.LOAD_LOGIN_SESSION_INFO:
            draft.loginSessionId = action.loginSessionId;
            draft.status = AUTHENTICATION_STATES.LOGGED_IN;
            draft.username = action.result.userName;
            draft.userEmail = action.result.userEmail;
            draft.userId = action.result.userId;
            draft.userMobilePhone = action.result.userMobilePhone;
            return;
        case types.LOGIN_CHAINS_SUCCESS:
            draft.chains = action.chains;
            methods = action.chains[draft.chainIndex].methods;
            draft.chainIndex = 0;
            draft.loginFormData = generateEmptyLoginFormData(methods[0]);
            draft.methodIndex = 0;
            draft.status = AUTHENTICATION_STATES.METHOD_AUTHENTICATION;
            return;
        case types.UPDATE_LOGIN_FORM_DATA:
            draft.loginFormData[action.key] = action.value;
            return;
        case types.UPDATE_LOGIN_CHAIN:
            draft.chainIndex = action.index;
            return;
        case types.UPDATE_USERNAME:
            draft.username = action.username;
            return;
        default:
            return;
    }
});

export default authenticationReducer;
