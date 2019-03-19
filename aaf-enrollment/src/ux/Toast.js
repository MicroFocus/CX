import './Toast.scss';
import PropTypes from 'prop-types';
import React from 'react';
import * as ReactDOM from 'react-dom';
import StatusIndicator, {STATUS_TYPE} from './StatusIndicator';

const TOAST_DISPLAY_LENGTH = 4000;
const TOAST_FADE_OUT_LENGTH = 100;
const TOAST_LOAD_STATUS = {         // Use states in order to calculate toast size before displaying it
    MOUNTING: 'MOUNTING',
    POSITIONING: 'POSITIONING',
    COMPLETE: 'COMPLETE'
};

/* Displays a toast notification.
 * After the display length, by default the toast will fade out of view and then be dismissed. The display timer and
 * fade timer measure the display length and fade out length, respectively. Clicking a toast stops it from auto-
 * dismissal. So does maintaining the cursor inside of a toast (when the cursor leaves the toast the timers will
 * restart). Clicking on a toast's close button dismisses it immediately (there is no fade-out animation). ERROR toast
 * types do not have auto-dismissal but rather stay visible until the user dismisses them. Each toast is positioned
 * horizontally via CSS but vertically by the parent via a fixed position property
 */
class Toast extends React.PureComponent {
    constructor(props) {
        super(props);

        this.displayTimeoutID = null;
        this.elementClicked = false;
        this.fadeTimeoutID = null;
        this.state = {
            fadeOut: false,
            loadStatus: TOAST_LOAD_STATUS.MOUNTING
        };
        this.toastRef = React.createRef();
    }

    clearDisplayTimer() {
        if (this.displayTimeoutID) {
            clearTimeout(this.displayTimeoutID);
            this.displayTimeoutID = null;
        }
    }

    clearFadeOut() {
        this.setState({ fadeOut: false });

        if (this.fadeTimeoutID) {
            clearTimeout(this.fadeTimeoutID);
            this.fadeTimeoutID = null;
        }
    }

    componentDidMount() {
        // As soon as possible, calculate the size of the toast (while it is hidden) and position it properly.
        // Why aren't we doing this immediately? The DOM hasn't yet been fully rendered, so we need to wait until the
        // this.setState callback. This is cleaner than the alternative (https://stackoverflow.com/a/34999925/5016547).
        this.setState({ loadStatus: TOAST_LOAD_STATUS.POSITIONING }, () => {
            const height = this.toastRef.current.getBoundingClientRect().height;

            this.setState({
                loadStatus: TOAST_LOAD_STATUS.COMPLETE
            }, () => {
                this.props.onLoadComplete(height);
            });
        });

        this.setDisplayTimer();
    }

    componentWillUnmount() {
        this.clearDisplayTimer();
        this.clearFadeOut();
    }

    fadeOut = () => {
        this.setState({
            fadeOut: true
        }, () => {
            this.fadeTimeoutID = setTimeout(this.props.onClose, TOAST_FADE_OUT_LENGTH);
        });
    };

    handleClick = () => {
        this.elementClicked = true;
    };

    handleMouseEnter = () => {
        this.clearDisplayTimer();
        this.clearFadeOut();
    };

    handleMouseLeave = () => {
        this.setDisplayTimer();
    };

    render() {
        const {fadeOut, loadStatus} = this.state;
        const {topPosition, onClose, type} = this.props;

        let toastClass = 'ias-toast';
        if (fadeOut) {
            toastClass += ' ias-fade-out';
        }

        let toastStyle = null;
        if (loadStatus === TOAST_LOAD_STATUS.COMPLETE && topPosition !== null) {
            toastStyle = { top: `${topPosition}px` };
        }
        else {
            toastStyle = { visibility: 'hidden' };
        }

        const toastContent = (
            <div
                className={toastClass}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                ref={this.toastRef}
                style={toastStyle}
            >
                <div className="ias-status-message">
                    <StatusIndicator onClose={onClose} type={type}>
                        {this.props.children}
                    </StatusIndicator>
                </div>
            </div>
        );

        // Detach element from document flow for cleaner positioning and layering
        return ReactDOM.createPortal(toastContent, document.body);
    }

    setDisplayTimer() {
        if (this.props.type !== STATUS_TYPE.ERROR && this.elementClicked === false) {
            this.clearDisplayTimer();
            this.displayTimeoutID = setTimeout(this.fadeOut, TOAST_DISPLAY_LENGTH);
        }
    }
}

Toast.propTypes = {
    onClose: PropTypes.func.isRequired,
    onLoadComplete: PropTypes.func.isRequired,
    topPosition: PropTypes.number,
    type: PropTypes.string.isRequired
};

export default Toast;
