import * as types from './action-types';
import * as api from '../api/api';
import {catchCommonErrors, createToastFromJsonErrors} from './error-handlers.actions';
import t from '../i18n/locale-keys';

const charCodeForUppercaseA = 'A'.charCodeAt(0);
const charCodeForUppercaseZ = 'Z'.charCodeAt(0);

export const fetchCategories = () => (dispatch, getStore) => {
    dispatch({ type: types.FETCH_CATEGORIES_REQUEST });

    const {loginSessionId} = getStore().authentication;
    return api.getCategories(loginSessionId).then(({categories}) => {
            // Add default category, since data from server does not include it
            const defaultCategory = { name: t.authenticatorDefaultCategory(), id: '' };
            categories.unshift({...defaultCategory});
            dispatch({ type: types.FETCH_CATEGORIES_SUCCESS, categories });
        })
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors)
        .catch((failedResponseData) => {
            dispatch({ type: types.FETCH_CATEGORIES_FAILURE, failedResponseData });
        });
};

export const fetchEnrollableChains = () => (dispatch, getStore) => {
    dispatch({ type: types.FETCH_ENROLLABLE_CHAINS_REQUEST });

    const {username, loginSessionId} = getStore().authentication;
    return api.getEnrollableChains(username, loginSessionId).then(({chains}) => {
            dispatch({ type: types.FETCH_ENROLLABLE_CHAINS_SUCCESS, chains });
        })
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors)
        .catch((failedResponseData) => {
            dispatch({ type: types.FETCH_ENROLLABLE_CHAINS_FAILURE, failedResponseData });
        });
};

export const fetchMethodTitles = () => (dispatch, getStore) => {
    dispatch({ type: types.FETCH_METHOD_TITLES_REQUEST });

    const {loginSessionId} = getStore().authentication;
    return api.getMethodTitles(loginSessionId).then(({methods}) => {
        dispatch({ type: types.FETCH_METHOD_TITLES_SUCCESS, methodTitles: methods });
    })
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors)
        .catch((failedResponseData) => {
            dispatch({ type: types.FETCH_METHOD_TITLES_FAILURE, failedResponseData });
        });
};

export const fetchPolicies = () => (dispatch, getStore) => {
    dispatch({ type: types.FETCH_POLICIES_REQUEST });

    const {loginSessionId, userId} = getStore().authentication;
    return api.getPolicies(userId, loginSessionId).then((data) => {
            const policies = data.policy;

            // Capitalize first letter of first-level keys whose second letter is also capitalized. This issue is
            // caused by camelizing strings such as 'SMSSender'
            Object.keys(policies).forEach((prop) => {
                if (prop.length < 2) {
                    return;
                }

                const secondCharCode = prop.charCodeAt(1);
                if (charCodeForUppercaseA <= secondCharCode && secondCharCode <= charCodeForUppercaseZ) {
                    const firstChar = prop.charAt(0);
                    const uppercaseFirstChar = firstChar.toUpperCase();
                    if (firstChar !== uppercaseFirstChar) {
                        const newProp = uppercaseFirstChar + prop.slice(1);
                        policies[newProp] = policies[prop];
                        delete policies[prop];
                    }
                }
            });

            // Rename weird keys from server
            policies.emergencyPasswordMethod = policies.EMERGPASSWORD;
            delete policies.EMERGPASSWORD;

            dispatch({ type: types.FETCH_POLICIES_SUCCESS, policies });
        })
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors)
        .catch((failedResponseData) => {
            dispatch({ type: types.FETCH_POLICIES_FAILURE, failedResponseData });
        });
};

export const fetchIndexedData = () => (dispatch, getStore) => {
    let fetchesComplete = 0;

    const callback = () => {
        if (++fetchesComplete >= 4) {
            dispatch({ type: types.INDEX_DATA });
        }
    };

    fetchCategories()(dispatch, getStore).then(callback);
    fetchEnrollableChains()(dispatch, getStore).then(callback);
    fetchTemplates()(dispatch, getStore).then(callback);
    fetchMethodTitles()(dispatch, getStore).then(callback);
};

export const fetchTemplates = () => (dispatch, getStore) => {
    dispatch({ type: types.FETCH_TEMPLATES_REQUEST });

    const {loginSessionId, userId} = getStore().authentication;
    return api.getUserTemplates(userId, loginSessionId).then(({templates}) => {
            dispatch({ type: types.FETCH_TEMPLATES_SUCCESS, templates });
        })
        .catch(catchCommonErrors(dispatch))
        .catch(createToastFromJsonErrors)
        .catch((failedResponseData) => {
            dispatch({ type: types.FETCH_TEMPLATES_FAILURE, failedResponseData });
        });
};
