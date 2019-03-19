import PropTypes from 'prop-types';
import React from 'react';
import {indexedChainType, templateType} from '../../types/types';
import {connect} from 'react-redux';
import {gotoEnrollmentDashboard, viewChainAuthenticator} from '../../actions/navigation.actions';
import {fetchIndexedData} from '../../actions/methods-display.actions';

const DIRECTIONS = {
    BACK: -1,
    NEXT: 1
};

class ChainNavigationButtons extends React.PureComponent {
    getChainSequenceIndex() {
        const {chain: {templates}, template: {methodId}} = this.props;

        for (let index = 0; index < templates.length; index++) {
            if (templates[index].methodId === methodId) {
                return index;
            }
        }

        return -1;
    }

    handleBackClick = () => {
        this.props.onNavigation(this.navigate.bind(this, DIRECTIONS.BACK));
    };

    handleNextClick = () => {
        this.props.onNavigation(this.navigate.bind(this, DIRECTIONS.NEXT));
    };

    handleFinishClick = () => {
        this.props.onNavigation(this.props.gotoEnrollmentDashboard);
    };

    navigate(direction) {
        const {chain} = this.props;
        const newChainSequenceIndex = this.getChainSequenceIndex() + direction;
        const newTemplate = chain.templates[newChainSequenceIndex];
        this.props.fetchIndexedData();
        this.props.viewChainAuthenticator(chain, newTemplate);
    }

    render() {
        const {chain: {templates}} = this.props;

        const chainSequenceLength = templates.length;
        const chainSequenceIndex = this.getChainSequenceIndex();

        const backButton = (chainSequenceIndex !== 0) ? (
            <button className="ias-button" id="prevAuthenticatorButton" type="button" onClick={this.handleBackClick}>
                Back
            </button>
        ) : null;

        const nextButton = (chainSequenceIndex !== chainSequenceLength - 1) ? (
            <button className="ias-button" id="nextAuthenticatorButton" type="button" onClick={this.handleNextClick}>
                Next
            </button>
        ) : null;

        const finishButton = (chainSequenceIndex === chainSequenceLength - 1) ? (
            <button className="ias-button" id="finishChainButton" type="button" onClick={this.handleFinishClick}>
                Finish
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
    onNavigation: PropTypes.func.isRequired,
    template: templateType.isRequired
};

const mapDispatchToProps = { fetchIndexedData, gotoEnrollmentDashboard, viewChainAuthenticator };

export default connect(null, mapDispatchToProps)(ChainNavigationButtons);
