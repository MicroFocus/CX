import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    exitAvailableMethodsView, viewChainAuthenticator, viewAuthenticator, AVAILABLE_METHODS_TYPES, HOMEPAGE_URL
} from '../../actions/navigation.actions';
import {
    availableIndexedTemplatesType, categoriesType, indexedChainsType
} from '../../types/types';
import {getTemplateKey} from '../../utils/key-generator';
import ChainTileList from '../tiles/ChainTileList';
import MethodTile from '../tiles/MethodTile';
import {fetchIndexedData} from '../../actions/methods-display.actions';
import {Redirect} from 'react-router-dom';
import {unenrollableMethods} from '../../data/MethodData';

class AvailableMethods extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.fetchIndexedData();
    }

    getChainsContent() {
        const { categories, indexedChains, nonDefaultCategoriesEnrolled, viewChainAuthenticator } = this.props;

        return (
            <React.Fragment>
                <div className="chains-grid-label">Sequence Methods</div>
                <div className="ias-grid">
                    <ChainTileList
                        categories={categories}
                        enrolled={false}
                        indexedChains={indexedChains}
                        nonDefaultCategoriesEnrolled={nonDefaultCategoriesEnrolled}
                        viewChainAuthenticator={viewChainAuthenticator}
                    />
                </div>
            </React.Fragment>
        );
    }

    getMethodsContent() {
        const { availableIndexedTemplates } = this.props;

        // Get an array of available templates in alphabetical order so they can be displayed properly.
        const availableTemplates =
            Object.keys(availableIndexedTemplates)
                .map(methodId => availableIndexedTemplates[methodId])
                .sort((templateA, templateB) => templateA.methodTitle.localeCompare(templateB.methodTitle));

        const methodElements = availableTemplates.map((template) => {
            if (unenrollableMethods.indexOf(template.methodId) !== -1) {    // Don't display unenrollable methods
                return null;
            }

            const key = getTemplateKey(template);
            const handleClick = () => this.props.viewAuthenticator(template);

            return <MethodTile id={key} key={key} onClick={handleClick} template={template} />;
        });

        return (
            <React.Fragment>
                <div className="methods-grid-label">Single Methods</div>
                <div className="ias-grid">
                    {methodElements}
                </div>
            </React.Fragment>
        );
    }

    handleClose = () => {
        this.props.exitAvailableMethodsView();
    };

    render() {
        const { availableIndexedTemplates, indexedChains, match } = this.props;
        const { type } = match.params;

        let content = null;
        if (availableIndexedTemplates && indexedChains) {
            switch (type) {
                case AVAILABLE_METHODS_TYPES.CHAINS:
                    content = this.getChainsContent();
                    break;
                case AVAILABLE_METHODS_TYPES.METHODS:
                    content = this.getMethodsContent();
                    break;
                default:
                    content = <Redirect to={HOMEPAGE_URL} />;
            }
        }

        return (
            <div className="ias-content-padding">
                <div className="ias-header">
                    <h2>Available Authentication Methods for Enrollment</h2>
                    <span className="ias-fill" />
                    <button
                        className="ias-button ias-icon-button"
                        onClick={this.handleClose}
                        title="Close"
                        type="button"
                    >
                        <i className="ias-icon ias-icon-close_thin" />
                    </button>
                </div>
                <p className="description">
                    Select an authentication method for enrollment. Once enrolled, the method can be used for sign in.
                    OTP methods are one-time password authenticators.
                </p>
                {content}
            </div>
        );
    }
}

AvailableMethods.propTypes = {
    availableIndexedTemplates: availableIndexedTemplatesType,
    categories: categoriesType,
    indexedChains: indexedChainsType,
    nonDefaultCategoriesEnrolled: PropTypes.bool
};

const mapStateToProps = ({methodsDisplay: {categories, indexedData}}) => ({...indexedData, categories});

const mapDispatchToProps = {
    fetchIndexedData,
    viewChainAuthenticator,
    viewAuthenticator,
    exitAvailableMethodsView
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableMethods);
