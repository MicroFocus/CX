import PropTypes from 'prop-types';

// Categories
const categoryType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
});
export const categoriesType = PropTypes.arrayOf(categoryType);

// Template
const templateShape = {
    comment: PropTypes.string,
    isEnrolled: PropTypes.bool.isRequired,
    isFullyEnrolled: PropTypes.bool.isRequired,
    methodId: PropTypes.string.isRequired,
    methodTitle: PropTypes.string.isRequired
};

const availableTemplateShape = Object.assign({
    availableCategoryIds: PropTypes.arrayOf(PropTypes.string).isRequired
});

const enrolledTemplateShape = Object.assign({
    categoryId: PropTypes.string,
    id: PropTypes.string.isRequired
}, templateShape);

export const templateType = PropTypes.shape(templateShape);
export const availableTemplateType = PropTypes.shape(availableTemplateShape);
export const enrolledTemplateType = PropTypes.shape(enrolledTemplateShape);

export const availableIndexedTemplatesType = PropTypes.objectOf(availableTemplateType);
export const enrolledTemplatesType = PropTypes.arrayOf(enrolledTemplateType);
export const enrolledIndexedTemplatesType = PropTypes.objectOf(enrolledTemplatesType);

// Chain
const methodType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    isEnrolled: PropTypes.bool.isRequired
});

const chainShape = {
    idHex: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    methods: PropTypes.arrayOf(methodType).isRequired,
};

const indexedChainShape = Object.assign({
    categoryId: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    chainUris: PropTypes.arrayOf(PropTypes.string).isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    templates: PropTypes.arrayOf(templateType).isRequired
}, chainShape);

export const indexedChainType = PropTypes.shape(indexedChainShape);
export const indexedChainsType = PropTypes.objectOf(PropTypes.arrayOf(indexedChainType));
