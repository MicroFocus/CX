import PropTypes from 'prop-types';
import React from 'react';
import {indexedChainType, templateType} from '../../types/types';
import {connect} from 'react-redux';
import {gotoEnrollmentDashboard, viewChainAuthenticator} from '../../actions/navigation.actions';
import {fetchIndexedData} from '../../actions/methods-display.actions';
import t from '../../i18n/locale-keys';

class ChainNavigationButtons extends React.PureComponent {
    handleBackClick = () => {
        this.props.onNavigation(this.navigateBack);
    };

    // Only back button click is handled by this component. Next and Finish are handled by AuthenticatorContainer.js
    // via onSubmit action.
    navigateBack = () => {
        const {chain} = this.props;
        const newChainSequenceIndex = this.props.chainSequenceIndex - 1;
        const newTemplate = chain.templates[newChainSequenceIndex];
        this.props.fetchIndexedData();
        this.props.viewChainAuthenticator(chain, newTemplate);
    };

    render() {
        const {chain: {templates}} = this.props;

        const chainSequenceLength = templates.length;
        const chainSequenceIndex = this.props.chainSequenceIndex;

        const backButton = (chainSequenceIndex !== 0) ? (
            <button className="ias-button" id="prevAuthenticatorButton" type="button" onClick={this.handleBackClick}>
                {t.buttonBack()}
            </button>
        ) : null;

        const nextButton = (chainSequenceIndex !== chainSequenceLength - 1) ? (
            <button className="ias-button" id="nextAuthenticatorButton">
                {t.buttonNext()}
            </button>
        ) : null;

        const finishButton = (chainSequenceIndex === chainSequenceLength - 1) ? (
            <button className="ias-button" id="finishChainButton">
                {t.buttonFinish()}
            </button>
        ) : null;

        return (
            <React.Fragment>
                {backButton}
                {nextButton}
                {finishButton}
            </React.Fragment>
        );
    }
}

ChainNavigationButtons.propTypes = {
    chain: indexedChainType.isRequired,
    chainSequenceIndex: PropTypes.number.isRequired,
    onNavigation: PropTypes.func.isRequired,
    template: templateType.isRequired
};

const mapDispatchToProps = { fetchIndexedData, gotoEnrollmentDashboard, viewChainAuthenticator };

export default connect(null, mapDispatchToProps)(ChainNavigationButtons);
