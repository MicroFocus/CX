import './Authenticator.scss';
import {IconButton} from '../../ux/ux';
import {methods} from '../../data/MethodData';
import ChainNavigationButtons from './ChainNavigationButtons';
import {categoriesType, indexedChainType, templateType} from '../../types/types';
import PropTypes from 'prop-types';
import React from 'react';
import getCategoryName from '../../utils/category-name';
import AuthenticatorStatus from './AuthenticatorStatus';

class Authenticator extends React.PureComponent {
    getFormContent() {
        const { comment, onCommentChange, statusMessage } = this.props;

        const categoryElements = this.getCategoryElements();

        return (
            <React.Fragment>
                <div className="ias-input-container">
                    <label htmlFor="authenticator-description">Display Name</label>
                    <input
                        id="authenticator-description"
                        type="text"
                        onChange={onCommentChange}
                        value={comment}
                    />
                </div>

                <AuthenticatorStatus statusMessage={statusMessage} />

                {categoryElements}

                {this.props.children}
            </React.Fragment>
        );
    }

    getCategoryElements() {
        const { categories, categoryIdInput, categoryFixed, onCategoryChange, template } = this.props;

        // Do not display categories if multiple do not exist
        if (!categories || categories.length <= 1) {
            return null;
        }

        let labelContent = null;

        if (categoryFixed) {
            const categoryName = getCategoryName(categories, categoryIdInput);
            labelContent = <span>{categoryName}</span>;
        }
        else {
            const categoryOptions = template.availableCategoryIds.map(id => {
                const key = id || 'default';
                const name = getCategoryName(categories, id);
                return <option key={key} value={id}>{name}</option>;
            });

            labelContent = (
                <select value={categoryIdInput} onChange={onCategoryChange}>
                    {categoryOptions}
                </select>
            );
        }

        return (
            <div className="ias-input-container authenticator-category">
                <label>Category
                    {labelContent}
                </label>
            </div>
        );
    }

    getSaveButtons() {
        const { chain, onChainNavigation, template } = this.props;

        if (chain) {
            return (
                <ChainNavigationButtons
                    chain={chain}
                    template={template}
                    onNavigation={onChainNavigation}
                />
            );
        }
        else {
            const buttonText = template.isEnrolled ? 'Done' : 'Save';
            return <button className="ias-button" id="authenticatorDoneButton">{buttonText}</button>;
        }
    }

    render() {
        const { description, unenrollable, onClose, onDelete, onSubmit, template } = this.props;

        const methodId = template.methodId;
        const {icon} = methods[methodId];

        let enrolledOptions = null;
        if (template.isEnrolled) {
            enrolledOptions = (
                <React.Fragment>
                    <i className="ias-icon ias-icon-check_thick secondary-icon" title="Enrolled" />
                    <IconButton
                        className="primary-icon-button"
                        icon="delete_thick"
                        onClick={onDelete}
                        title="Delete Enrollment"
                    />
                </React.Fragment>
            );
        }

        let formContent = null;
        if (unenrollable) {
            formContent = <p>This method is managed by your administrator. There is nothing to configure.</p>;
        }
        else {
            formContent = this.getFormContent();
        }

        const saveButtons = this.getSaveButtons();

        return (
            <React.Fragment>
                <div className="ias-header">
                    <i className={`ias-icon ias-icon-${icon} primary-icon`} />
                    <h2>{template.methodTitle}</h2>
                    {enrolledOptions}
                    <span className="ias-fill" />
                    <IconButton icon="close_thin" onClick={onClose} title="Close" />
                </div>
                <p className="description">
                    {description}
                </p>

                <form className="authenticator-form" onSubmit={onSubmit}>
                    {formContent}

                    <div className="authenticator-buttons">
                        {saveButtons}
                        <button className="ias-button" id="authenticatorCancelButton" onClick={onClose} type="button">
                            Cancel
                        </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

Authenticator.propTypes = {
    categories: categoriesType,
    categoryIdInput: PropTypes.string.isRequired,
    chain: indexedChainType,
    comment: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onChainNavigation: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onCommentChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    statusMessage: PropTypes.shape({
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }),
    template: templateType.isRequired,
    unenrollable: PropTypes.bool
};

export default Authenticator;
