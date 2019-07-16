import {connect} from 'react-redux';
import React from 'react';
import {Redirect} from 'react-router-dom';
import {viewDashboard, viewAuthenticator} from '../../actions/navigation.actions';
import {getTemplateKey} from '../../utils/key-generator';
import MethodTile from '../tiles/MethodTile';
import PropTypes from 'prop-types';
import {categoriesType, templateType} from '../../types/types';
import getCategoryName from '../../utils/category-name';
import t from '../../i18n/locale-keys';

class ChooseAuthenticator extends React.PureComponent {
    chooseAuthenticator = (template) => {
        this.props.viewAuthenticator(template);
    };

    handleClose = () => {
        this.props.viewDashboard();
    };

    render() {
        const {categories, match, nonDefaultCategoriesEnrolled, templatesOfType} = this.props;

        if (templatesOfType.length === 1) {
            return <Redirect to={`${match.url}/${templatesOfType[0].id}`} />;
        }

        const methodElements = templatesOfType.map((template) => {
            const categoryName = (nonDefaultCategoriesEnrolled && template.isEnrolled)
                ? getCategoryName(categories, template.categoryId) : null;
            const handleClick = () => this.chooseAuthenticator(template);
            const key = getTemplateKey(template);

            return (
                <MethodTile
                    categoryName={categoryName}
                    id={key}
                    key={key}
                    onClick={handleClick}
                    template={template}
                    templateChoice
                />
            );
        });
        const methodTitle = templatesOfType[0].methodTitle;

        return (
            <div className="ias-content-padding">
                <div className="ias-header">
                    <h2>{t.authenticatorSelectTitle()}</h2>
                    <span className="ias-fill" />
                    <button
                        className="ias-button ias-icon-button"
                        id="Close_Button"
                        onClick={this.handleClose}
                        title={t.buttonClose()}
                        type="button"
                    >
                        <i className="ias-icon ias-icon-close_thin" />
                    </button>
                </div>
                <p className="description">
                    {t.authenticatorSelectDescription()}
                </p>

                <div className="methods-grid-label">{t.authenticatorSelectSubtitle(methodTitle)}</div>
                <div className="ias-grid">
                    {methodElements}
                </div>
            </div>
        );
    }
}

ChooseAuthenticator.propTypes = {
    categories: categoriesType,
    nonDefaultCategoriesEnrolled: PropTypes.bool.isRequired,
    templatesOfType: PropTypes.arrayOf(templateType)
};

const mapDispatchToProps = { viewDashboard, viewAuthenticator };

export default connect(null, mapDispatchToProps)(ChooseAuthenticator);
