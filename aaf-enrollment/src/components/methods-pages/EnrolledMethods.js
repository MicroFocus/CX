import './EnrolledMethods.scss';
import Tile, {TYPE_ADD} from '../tiles/Tile';
import React from 'react';
import {connect} from 'react-redux';
import {
    viewAvailableChains, viewAvailableMethods, viewChainAuthenticator, viewAuthenticator
} from '../../actions/navigation.actions';
import PropTypes from 'prop-types';
import {
    categoriesType, indexedChainsType, availableIndexedTemplatesType, enrolledTemplatesType
} from '../../types/types';
import {getTemplateKey} from '../../utils/key-generator';
import ChainTileList from '../../components/tiles/ChainTileList';
import MethodTile from '../../components/tiles/MethodTile';
import {fetchIndexedData} from '../../actions/methods-display.actions';
import getCategoryName from '../../utils/category-name';
import t from '../../i18n/locale-keys';

class EnrolledMethods extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.fetchIndexedData();
    }

    render() {
        const {alwaysHideCategories, categories, enrolledTemplates, indexedChains, nonDefaultCategoriesEnrolled,
            viewChainAuthenticator} = this.props;

        let methodElements = null;
        if (enrolledTemplates) {
            methodElements = enrolledTemplates.map((template) => {
                const categoryName = nonDefaultCategoriesEnrolled
                    ? getCategoryName(categories, template.categoryId) : null;
                const key = getTemplateKey(template);
                const handleClick = () => this.props.viewAuthenticator(template);

                return (
                    <MethodTile
                        categoryName={categoryName}
                        id={key}
                        key={key}
                        onClick={handleClick}
                        template={template}
                    />
                );
            });
        }

        let chainTileList = null;
        if (indexedChains) {
            chainTileList = (
                <ChainTileList
                    alwaysHideCategories={alwaysHideCategories}
                    categories={categories}
                    enrolled
                    indexedChains={indexedChains}
                    nonDefaultCategoriesEnrolled={nonDefaultCategoriesEnrolled}
                    viewChainAuthenticator={viewChainAuthenticator}
                />
            );
        }

        let consentBlock = null;
        if (this.props.policies && this.props.policies.deleteMeOptions.data.deleteMeEnabled) {
            consentBlock = (
                <div className="consent-block">
                    <div className="ias-status-message">
                        <div className="ias-status-message-title">
                            <i className="ias-icon ias-icon-status_info_thick ias-info" />
                            <span>{t.enrollmentConsentTitle()}</span>
                        </div>
                        <p>
                            {t.enrollmentConsentDescription()}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="ias-content-padding">
                <h2>{t.enrolledMethodsTitle()}</h2>
                <p className="description">
                    {t.enrolledMethodsDescription()}
                </p>

                <div className="methods-grid-label">{t.enrolledMethodsSubtitle()}</div>
                <div className="ias-grid">
                    {methodElements}
                    <Tile
                        icon="new_thin"
                        id="add-methods-tile"
                        key="Add"
                        onClick={this.props.viewAvailableMethods}
                        title={t.addLabel()}
                        type={TYPE_ADD}
                    />
                </div>

                <div className="chains-grid-label">{t.enrolledChainsSubtitle()}</div>
                <div className="ias-grid">
                    {chainTileList}
                    <div className="add-chain-container">
                        <Tile
                            icon="new_thin"
                            id="add-chains-tile"
                            key="Add"
                            onClick={this.props.viewAvailableChains}
                            title={t.addLabel()}
                            type={TYPE_ADD}
                        />
                    </div>
                </div>
                {consentBlock}
            </div>
        );
    }
}

EnrolledMethods.propTypes = {
    availableIndexedTemplates: availableIndexedTemplatesType,
    categories: categoriesType,
    enrolledTemplates: enrolledTemplatesType,
    indexedChains: indexedChainsType,
    nonDefaultCategoriesEnrolled: PropTypes.bool
};

const mapStateToProps = ({methodsDisplay: {categories, enrolledTemplates, indexedData, policies}}) => {
    return {...indexedData, categories, enrolledTemplates, policies};
};

const mapDispatchToProps = {
    fetchIndexedData,
    viewAvailableChains,
    viewAvailableMethods,
    viewChainAuthenticator,
    viewAuthenticator
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrolledMethods);
