import * as types from '../actions/action-types';

/* This reducer stores state related to navigation within the app.
 * Allows the app to show a confirmation dialog before navigation occurs.
 * Allows the app to determine whether redirection to the login page is being caused by the user signing out.
 */

const initialState = {
    navigationDialogMessage: null,
    navigationDialogTitle: null,
    showNavigationDialog: false,
    signOutInProcess: false
};
function navigationReducer(state = initialState, action) {
    switch (action.type) {
        case types.BEGIN_SIGN_OUT:
            return {...state, signOutInProcess: true};
        case types.FINISH_SIGN_OUT:
            return {...state, signOutInProcess: false};
        case types.HIDE_NAVIGATION_DIALOG:
            return {
                ...state,
                showNavigationDialog: false,
                navigationDialogMessage: null,
                navigationDialogTitle: null
            };
        case types.SHOW_NAVIGATION_DIALOG:
            return {
                ...state,
                showNavigationDialog: true,
                navigationDialogMessage: action.message,
                navigationDialogTitle: action.title
            };
        default:
            return state;
    }
}

export default navigationReducer;
