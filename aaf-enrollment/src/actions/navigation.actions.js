import * as types from './action-types';
import {logoutUser} from './authentication.actions';
import history from '../history';
import {generateQueryString, parseQueryString} from '../utils/url-functions';
import t from '../i18n/locale-keys';

/* This file initiates route navigation actions. Before any navigation takes place, action creators check for unsaved
 * work on the page. If unsaved work is present, the navigation is suspended, whereupon the app shows a dialog asking
 * the user if they wish to leave their unsaved work. When the user cancels or confirms the dialog, navigation is
 * aborted or continued.
 */

export const HOMEPAGE_URL = '/';
export const AVAILABLE_METHODS_TYPES = {
    METHODS: 'methods',
    CHAINS: 'chains'
};
export const ADD_METHOD_TYPE = 'add';

export function getAuthenticatorLink(template, enrolledIndexedTemplates) {
    const {methodId} = template;
    const enrolledTemplatesOfMethod = enrolledIndexedTemplates[methodId];
    const numEnrolledTemplatesOfMethod = enrolledTemplatesOfMethod ? enrolledTemplatesOfMethod.length : 0;

    // Use an additional qualifier in the URL only if there is more than one possibility for our route
    // The application assumes if there is only 1 enrolled method, we intend to edit it when no additional qualifier
    // is used
    let useTemplateTypeUri;
    if (template.isEnrolled) {
        useTemplateTypeUri = numEnrolledTemplatesOfMethod > 1;
    }
    else {
        useTemplateTypeUri = numEnrolledTemplatesOfMethod > 0;
    }

    let url = '/' + getMethodUriFromId(template.methodId);

    if (useTemplateTypeUri) {
        url += '/' + (template.isEnrolled ? template.id : ADD_METHOD_TYPE);
    }

    return url;
}

function getCategoryQueryFromChain(chain) {
    if (chain.categoryId.length) {
        return chain.categoryName.toLowerCase();
    }
    else {
        return null;
    }
}

export function getChainAuthenticatorLink(chain, template) {
    const chainUri = getChainUriFromChain(chain);
    const methodUri = getMethodUriFromId(template.methodId);
    let url = `/chains/${chainUri}/${methodUri}`;

    const categoryQuery = getCategoryQueryFromChain(chain);
    if (categoryQuery) {
        url += generateQueryString({category: categoryQuery});
    }
    return url;
}

function getChainUriFromChain(chain) {
    return encodeURIComponent(chain.chainUris[0]);
}

export function normalizeChainUri(chainUri) {
    return decodeURIComponent(chainUri).toLowerCase();
}

export function getMethodIdFromUri(methodUri) {
    return methodUri.toUpperCase() + ':1';
}

function getMethodUriFromId(methodId) {
    const unencodedUri = methodId.slice(0, -2).toLowerCase();
    return encodeURIComponent(unencodedUri);
}


/* Navigation that can cause unsaved work
 * These actions use a factory function to create an async action that checks for unsaved work before proceeding
 */
export const exitAvailableMethodsView = () => ensureWorkSaved(
    () => history.push('/')
);

export const gotoEnrollmentDashboard = () => ensureWorkSaved(
    () => history.push('/')
);

export const signOut = () => ensureWorkSaved(
    (dispatch, getStore) => {
        dispatch({type: types.BEGIN_SIGN_OUT});
        logoutUser()(dispatch, getStore);
    }
);

export const viewAvailableChains = () => ensureWorkSaved(
    () => history.push('/available/' + AVAILABLE_METHODS_TYPES.CHAINS)
);

export const viewAvailableMethods = () => ensureWorkSaved(
    () => history.push('/available/' + AVAILABLE_METHODS_TYPES.METHODS)
);

export const viewAuthenticator = (template) => ensureWorkSaved(
    (dispatch, getStore) => {
        const {enrolledIndexedTemplates} = getStore().methodsDisplay.indexedData;
        history.push(getAuthenticatorLink(template, enrolledIndexedTemplates));
    }
);

export const viewChainAuthenticator = (chain, template) => ensureWorkSaved(
    () => history.push(getChainAuthenticatorLink(chain, template))
);

export const viewDashboard = () => ensureWorkSaved(
    () => history.push('/')
);

export const viewLanguagesPage = () => ensureWorkSaved(
    () => history.push('/languages')
);

/* Navigation that does not cause unsaved work
 */
// For WebAuthentication method, get query string object and remove queries related to redirect
export const getAndResetRedirectQuery = () => () => {
    let query = {};
    const search = history.location.search;

    if (search) {
        // Redirect query strings come back in snake case since our API request function converts them
        query = parseQueryString(search);
        const {pathname, state} = history.location;
        const newLocation = { pathname, state };

        const newQuery = {...query};
        delete newQuery.category_id_input;
        delete newQuery.enroll_process_id;
        delete newQuery.finish_enrollment;
        delete newQuery.finish_test;
        if (Object.keys(newQuery).length) {
            newLocation.search = generateQueryString(newQuery);
        }

        history.replace(newLocation);
    }

    return query;
};

export const goBack = () => (dispatch) => {
    history.goBack();
};

export const openCompanyPage = () => (dispatch) => {
    const url = 'https://www.netiq.com/authasas/';
    window.open(url, '_blank');
};

/* Functions that help check for unsaved work before proceeding with navigation. A single form on the page may
 * subscribe to be notified before it is unloaded. This is similar to window.onbeforeunload but also applies to
 * routes within our app and not just navigation away from the app.
 */
let unloadFormListener = null;      // Listener that when called, returns a message to be shown in an alert dialog
                                    // if a form has unsaved work. Otherwise returns false.
let continueNavigationFn = null;    // Called to continue with pending navigation

export const setUnloadFormListener = (listener) => () => {
    unloadFormListener = listener;
};

export const removeUnloadFormListener = () => () => {
    unloadFormListener = null;
};

// Factory function that checks for unsaved work before proceeding with navigation within the app.
// If there is a form on the page with unsaved work, suspend the initiated navigation and save it for later.
// Wraps the async Redux function and calls it when ready to proceed.
const ensureWorkSaved = (actionFunction) => function(dispatch, getStore) {
    const callActionFunction = () => actionFunction(dispatch, getStore);

    let unsavedChanges = false;
    if (unloadFormListener) {
        unsavedChanges = unloadFormListener();
    }

    if (unsavedChanges) {
        const title = t.unsavedWorkWarningTitle();
        showNavigationDialog(title, unsavedChanges, callActionFunction)(dispatch);
    }
    else {
        callActionFunction();
    }
};

export function abortPendingNavigation() {
    return (dispatch) => dispatch({type: types.HIDE_NAVIGATION_DIALOG});
}

export function continuePendingNavigation() {
    return (dispatch) => {
        dispatch({type: types.HIDE_NAVIGATION_DIALOG});
        continueNavigationFn();
    };
}

export const showNavigationDialog = (title, message, callback) => (dispatch) => {
    dispatch({type: types.SHOW_NAVIGATION_DIALOG, message, title});
    continueNavigationFn = callback;
};

// Warn the user before navigation away from the app
window.addEventListener('beforeunload', (event) => {
    let unsavedChanges = false;
    if (unloadFormListener) {
        unsavedChanges = unloadFormListener();
    }

    if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = unsavedChanges;
    }
});
