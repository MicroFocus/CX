import * as types from '../actions/action-types';
import getCategoryName from '../utils/category-name';
import {produce} from 'immer';

// This reducer manages data necessary to load the views for and manage authenticators.
const initialState = {
    categories: null,
    chains: {},
    indexedData: {
        availableIndexedTemplates: null,
        enrolledIndexedTemplates: null,
        indexedChains: null,
        nonDefaultCategoriesEnrolled: false
    },
    methodTitles: {},
    policies: null,
    enrolledTemplates: []
};

const methodsDisplayReducer = (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case types.CLEAR_USER_INFO:
            return initialState;
        case types.FETCH_CATEGORIES_SUCCESS:
            draft.categories = action.categories;
            return;
        case types.FETCH_ENROLLABLE_CHAINS_SUCCESS:
            draft.chains = action.chains;
            return;
        case types.FETCH_METHOD_TITLES_SUCCESS:
            const indexedMethodTitles = {};     // Arrange into an object for easy lookup
            action.methodTitles.forEach(({id, title}) => {
                indexedMethodTitles[id] = title;
            });
            draft.methodTitles = indexedMethodTitles;
            return;
        case types.FETCH_POLICIES_SUCCESS:
            draft.policies = action.policies;
            return;
        case types.FETCH_TEMPLATES_SUCCESS:
            // Use isFullyEnrolled in place of isEnrolled to reduce confusion in this application
            action.templates.forEach((template) => {
                template.isFullyEnrolled = template.isEnrolled;
                template.isEnrolled = true;
            });
            // Sort enrolled templates so they will appear in alphabetical order on the dashboard
            draft.enrolledTemplates = action.templates.sort((templateA, templateB) => {
                const firstComparison = templateA.methodTitle.localeCompare(templateB.methodTitle);
                if (firstComparison !== 0) {
                    return firstComparison;
                }
                else {
                    return (templateA.categoryId < templateB.categoryId) ? -1 : 1;
                }
            });
            return;
        case types.INDEX_DATA:
            draft.indexedData = indexData(draft);
            return;
        default:
            return;
    }
});

export default methodsDisplayReducer;

// Index most of the data into a form much more usable by our app.
function indexData(state) {
    let nonDefaultCategoriesEnrolled = false;
    let alwaysHideCategories = true;

    // Organize templates by methodId. Set nonDefaultCategoriesEnrolled to true if any categories besides "Default"
    // are enrolled
    const enrolledIndexedTemplates = {};
    state.enrolledTemplates.forEach((template) => {
        const { categoryId, methodId } = template;
        if (categoryId.length) {
            nonDefaultCategoriesEnrolled = true;
            alwaysHideCategories = false;
        }

        if (enrolledIndexedTemplates[methodId]) {
            enrolledIndexedTemplates[methodId].push(template);
        }
        else {
            enrolledIndexedTemplates[methodId] = [template];
        }
    });

    // Loop through each chain. Match templates to each of the chain's methods. Create a list of all available methods.
    const availableIndexedTemplates = {};

    const generateAvailableTemplate = (methodId, categoryId) => {
        return {
            availableCategoryIds: [categoryId],
            comment: '',
            isEnrolled: false,
            isFullyEnrolled: false,
            methodId,
            methodTitle: state.methodTitles[methodId]
        };
    };

    const addAvailableTemplate = (methodId, categoryId) => {
        if (availableIndexedTemplates[methodId]) {
            const availableCategoryIds = availableIndexedTemplates[methodId].availableCategoryIds;
            if (availableCategoryIds.indexOf(categoryId) === -1) {  // Only add category if not done yet
                availableCategoryIds.push(categoryId);
            }
        }
        else {
            availableIndexedTemplates[methodId] = generateAvailableTemplate(methodId, categoryId);
        }
    };

    // Convert the chains data to index by categoryId instead of category name.
    const indexedChains = {};
    Object.keys(state.chains).forEach((key) => {
        const chainsOfCategory = state.chains[key];
        for (let index = 0; index < state.categories.length; index++) {
            const category = state.categories[index];
            if (category.id === key || category.name === key.toUpperCase()) {
                // Only show chains with methods available to this user. (If a chain's methods are not available to
                // the user the server may return an empty array of methods. In this case we should skip the chain.)
                const availableChainsOfCategory = chainsOfCategory.filter(chain => (chain.methods.length));

                // Category match found, index it
                indexedChains[category.id] = availableChainsOfCategory;

                if (category.id.length) {
                    alwaysHideCategories = false;
                }
                break;
            }
        }
    });


    Object.keys(indexedChains).forEach((categoryId) => {
        const chainsOfCategory = indexedChains[categoryId];
        chainsOfCategory.forEach((chain) => {
            // Match a template to each of the chain's methods.
            let chainNotEnrolled = false;
            chain.templates = [];
            chain.methods.forEach((method) => {
                // If the method is enrolled, attempt to match it to an enrolled template. Otherwise match it to
                // a new available template.
                const {id: methodId, isEnrolled} = method;
                if (isEnrolled) {
                    let matchingTemplates = enrolledIndexedTemplates[methodId];
                    if (matchingTemplates.length) {
                        matchingTemplates = matchingTemplates.filter(template => (categoryId === template.categoryId));
                        if (matchingTemplates.length) {
                            chain.templates.push(matchingTemplates[0]);
                            return;     // Match found, we are done with this method
                        }
                        else {
                            console.error('Error! No templates of method-category id: ' + methodId + '-' + categoryId);
                        }
                    }
                    else {
                        console.error('Error! No templates of method id: ' + methodId);
                    }
                }

                chainNotEnrolled = true;
                chain.templates.push(generateAvailableTemplate(methodId, categoryId));
                addAvailableTemplate(methodId, categoryId);
            });

            // Set other chain properties.
            chain.isEnrolled = !chainNotEnrolled;
            chain.categoryId = categoryId;
            chain.categoryName = getCategoryName(state.categories, categoryId);
            const chainUris = [];
            if (chain.shortName.length) {
                chainUris.push(chain.shortName.toLowerCase());
            }
            chainUris.push(chain.idHex);
            chain.chainUris = chainUris;
        });
    });

    return { alwaysHideCategories, availableIndexedTemplates, enrolledIndexedTemplates, indexedChains,
        nonDefaultCategoriesEnrolled };
}
