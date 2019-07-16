import './LoadingIndicator.scss';
import PropTypes from 'prop-types';
import React from 'react';
import * as ReactDOM from 'react-dom';

class LoadingIndicator extends React.PureComponent {
    render() {
        const content = (
            <div className="loading-indicator">
                <div className="loading-indicator-content">
                    <div className="ias-status-message">
                        <div className="ias-status-message-title">
                            <img alt={this.props.message} src={process.env.PUBLIC_URL + '/loading_anim_50.gif'} />
                            <span>{this.props.message}</span>
                        </div>
                    </div>
                </div>
            </div>
        );

        return ReactDOM.createPortal(content, document.body);
    }
}

LoadingIndicator.propTypes = {
    message: PropTypes.string.isRequired
};

export default LoadingIndicator;