import './Authenticator.scss';
import {IconButton} from '../../ux/ux';
import {methods, autocreatedMethods} from '../../data/MethodData';
import ChainNavigationButtons from './ChainNavigationButtons';
import {categoriesType, indexedChainType, templateType} from '../../types/types';
import PropTypes from 'prop-types';
import React from 'react';
import getCategoryName from '../../utils/category-name';
import AuthenticatorStatus from './AuthenticatorStatus';
import TestAuthenticatorButton from './test-authenticator/TestAuthenticatorButton';
import t from '../../i18n/locale-keys';

class Authenticator extends React.PureComponent {
    getFormContent() {
        const { comment, onCommentChange, statusMessage } = this.props;

        const categoryElements = this.getCategoryElements();

        return (
            <React.Fragment>
                <div className="ias-input-container">
                    <label htmlFor="authenticator-description">{t.displayName()}</label>
                    <input
                        autoComplete="off"
                        autoFocus
                        id="authenticator-description"
                        type="text"
                        onChange={onCommentChange}
                        value={comment}
                    />
                    <TestAuthenticatorButton {...this.props.test} />
                </div>

                {categoryElements}

                <AuthenticatorStatus statusMessage={statusMessage} />

                {this.props.children}
            </React.Fragment>
        );
    }

    getCategoryElements() {
        const { alwaysHideCategories, categories, categoryIdInput, categoryFixed, onCategoryChange, template }
            = this.props;

        // Do not display categories if specified
        if (alwaysHideCategories) {
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
                <label>{t.authenticatorCategory()}
                    {labelContent}
                </label>
            </div>
        );
    }

    getSaveButtons() {
        const { chain, chainSequenceIndex, onChainNavigation, template } = this.props;

        if (chain) {
            return (
                <ChainNavigationButtons
                    chain={chain}
                    chainSequenceIndex={chainSequenceIndex}
                    template={template}
                    onNavigation={onChainNavigation}
                />
            );
        }
        else {
            return <button className="ias-button" id="Save_Button">{t.buttonSave()}</button>;
        }
    }

    render() {
        const { description, unenrollable, onClose, onDelete, onSubmit, template } = this.props;

        const methodId = template.methodId;
        const {icon} = methods[methodId];

        const enrolledOptions = [];
        if (template.isFullyEnrolled) {
            enrolledOptions.push((
                <i
                    className="ias-icon ias-icon-check_thick secondary-icon"
                    key="enrolled-check"
                    title={t.authenticatorEnrolled()}
                />
            ));
        }
        // Only allow deletion of enrolled method if we aren't in readonly mode and the method isn't autocreated
        if (template.isEnrolled && !this.props.readonlyMode && autocreatedMethods.indexOf(template.methodId) === -1) {
            enrolledOptions.push((
                <IconButton
                    className="primary-icon-button"
                    key="delete-button"
                    icon="delete_thick"
                    id="Delete_Button"
                    onClick={onDelete}
                    title={t.authenticatorDelete()}
                />
            ));
        }

        let formContent = null;
        if (unenrollable) {
            formContent = <p>{t.authenticatorUnenrollableDescription()}</p>;
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
                    <IconButton icon="close_thin" onClick={onClose} title={t.buttonClose()} />
                </div>
                <p className="description">
                    {description}
                </p>

                <form className="authenticator-form" onSubmit={onSubmit}>
                    {formContent}

                    <div className="authenticator-buttons">
                        {saveButtons}
                        <button className="ias-button" id="Cancel_Button" onClick={onClose} type="button">
                            {t.buttonCancel()}
                        </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

Authenticator.propTypes = {
    alwaysHideCategories: PropTypes.bool.isRequired,
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
    readonlyMode: PropTypes.bool.isRequired,
    statusMessage: PropTypes.shape({
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }),
    template: templateType.isRequired,
    unenrollable: PropTypes.bool
};

export default Authenticator;
