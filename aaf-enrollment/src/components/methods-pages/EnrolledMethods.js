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

class EnrolledMethods extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.fetchIndexedData();
    }

    render() {
        const {categories, enrolledTemplates, indexedChains, nonDefaultCategoriesEnrolled, viewChainAuthenticator}
            = this.props;

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
                    categories={categories}
                    enrolled
                    indexedChains={indexedChains}
                    nonDefaultCategoriesEnrolled={nonDefaultCategoriesEnrolled}
                    viewChainAuthenticator={viewChainAuthenticator}
                />
            );
        }

        return (
            <div className="ias-content-padding">
                <h2>Authentication Methods</h2>
                <p className="description">
                    Enrolled methods are authenticators that you have already enrolled, and can be used to sign in.
                    OTP methods are one-time password authenticators.
                </p>

                <div className="methods-grid-label">Your Enrolled Single Methods for sign in</div>
                <div className="ias-grid">
                    {methodElements}
                    <Tile
                        icon="new_thin"
                        id="add-methods-tile"
                        key="Add"
                        onClick={this.props.viewAvailableMethods}
                        title="Add"
                        type={TYPE_ADD}
                    />
                </div>

                <div className="chains-grid-label">Your Enrolled Sequence Methods for sign in</div>
                <div className="ias-grid">
                    {chainTileList}
                    <div className="add-chain-container">
                        <Tile
                            icon="new_thin"
                            id="add-chains-tile"
                            key="Add"
                            onClick={this.props.viewAvailableChains}
                            title="Add"
                            type={TYPE_ADD}
                        />
                    </div>
                </div>
                <div className="consent-block">
                    <div className="ias-status-message">
                        <div className="ias-status-message-title">
                            <i className="ias-icon ias-icon-status_info_thick ias-info" />
                            <span>Enrollment Consent</span>
                        </div>
                        <p>
                            By enrolling in this system you consent to our storing your enrollment data to validate
                            your identity upon future authentication requests. The data may also be used to send
                            communications (most often login tokens) via email, SMS, push message, voice call or other
                            methods. The data may can be used for internal analytics, forensics, and troubleshooting.
                            We always treat your personal data with the highest security and we do not share any data
                            elements. You have the right to withdraw this consent at any time using the Delete me
                            button on the enrollment web page.
                        </p>
                    </div>
                </div>
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

const mapStateToProps = ({methodsDisplay: {categories, enrolledTemplates, indexedData}}) => {
    return {...indexedData, categories, enrolledTemplates};
};

const mapDispatchToProps = {
    fetchIndexedData,
    viewAvailableChains,
    viewAvailableMethods,
    viewChainAuthenticator,
    viewAuthenticator
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrolledMethods);
