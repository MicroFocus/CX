import React from 'react';
import PropTypes from 'prop-types';
import t from '../../../i18n/locale-keys';

export const MULTIFINGER_IDS = {
    LEFT_FINGERS: 'LEFT_FINGERS',
    RIGHT_FINGERS: 'RIGHT_FINGERS',
    THUMBS: 'THUMBS'
};
export const MULTIFINGER_MAP_ORDER = {
    LEFT_FINGERS: ['4', '6', '8', '10'],
    RIGHT_FINGERS: ['3', '5', '7', '9'],
    THUMBS: ['2', '1']
};
const MULTIFINGER_SCAN_INDEX = {
    LEFT_FINGERS: 1,
    RIGHT_FINGERS: 2,
    THUMBS: 3
};
const LEFT_MULTIFINGER_DATA =
    { id: MULTIFINGER_IDS.LEFT_FINGERS, startFingerIndex: 0, endFingerIndex: 4, x: 2, y: 1, width: 174, height: 112 };
const THUMBS_MULTIFINGER_DATA =
    { id: MULTIFINGER_IDS.THUMBS, startFingerIndex: 4, endFingerIndex: 6, x: 200, y: 100, width: 86, height: 77 };
const RIGHT_MULTIFINGER_DATA =
    {...LEFT_MULTIFINGER_DATA, id: MULTIFINGER_IDS.RIGHT_FINGERS, startFingerIndex: 6, endFingerIndex: 10 };
const MULTIFINGER_DATA = [ LEFT_MULTIFINGER_DATA, THUMBS_MULTIFINGER_DATA, RIGHT_MULTIFINGER_DATA ];

const MULTIFINGER_BORDER_WIDTH = 2;

const LEFT_FINGERTIP_POSITIONS = [
    { id: 10, x: 6, y: 75 },
    { id: 8, x: 45, y: 37 },
    { id: 6, x: 93, y: 23 },
    { id: 4, x: 142, y: 34 },
    { id: 2, x: 205, y: 138 },
];
const LEFT_FINGERTIP_RELATIVE_POSITIONS = LEFT_FINGERTIP_POSITIONS.map(((fingerPosition, index) => {
    if (index === 4) {
        return {
            id: fingerPosition.id,
            x: fingerPosition.x - THUMBS_MULTIFINGER_DATA.x - MULTIFINGER_BORDER_WIDTH,
            y: fingerPosition.y - THUMBS_MULTIFINGER_DATA.y - MULTIFINGER_BORDER_WIDTH
        };
    }

    return {
        id: fingerPosition.id,
        x: fingerPosition.x - LEFT_MULTIFINGER_DATA.x - MULTIFINGER_BORDER_WIDTH,
        y: fingerPosition.y - LEFT_MULTIFINGER_DATA.y - MULTIFINGER_BORDER_WIDTH
    };
}));

const RIGHT_FINGERTIP_RELATIVE_POSITIONS = LEFT_FINGERTIP_RELATIVE_POSITIONS.map((fingerPosition) => {
    return {...fingerPosition, id: fingerPosition.id - 1};
}).reverse();
const FINGERTIP_RELATIVE_POSITIONS = LEFT_FINGERTIP_RELATIVE_POSITIONS.concat(RIGHT_FINGERTIP_RELATIVE_POSITIONS)
    .map((fingerPosition) => ({...fingerPosition, id: fingerPosition.id.toString()}));     // Use string ids
const FINGERS_ON_HAND = 5;

export class FingerprintHandmap extends React.PureComponent {
    renderFingerprintElement(fingertipPosition, arrayIndex) {
        const {duressFingerIndex, enableEnrollment, fingerIsEnrollable, fingersScanned, multiFingerReaderMode,
            onFingerprintClick, scanFingerId, showDuressFingerMode} = this.props;

        if (!fingerIsEnrollable(fingertipPosition.id)) {
            return null;
        }

        const {x, y, id} = fingertipPosition;
        const fingerScanInProgress = (scanFingerId === id);
        const fingerScanned = fingersScanned[id];

        // In duress finger mode, show only scanned fingers
        if (showDuressFingerMode && !fingerScanned) {
            return null;
        }

        const style = {top: `${y}px`};
        const horizontalStyleRule = (arrayIndex < FINGERS_ON_HAND) ? 'left' : 'right';
        style[horizontalStyleRule] = `${x}px`;
        const key = `fingerprint-${id}`;

        let fingerprintClass = 'fingerprint';
        let secondaryIcon = null;
        if (fingerScanned) {
            fingerprintClass += ' enrolled';
            if (duressFingerIndex === id) {
                secondaryIcon = <i className="ias-icon ias-icon-favorite_fill" />;
            }
            else {
                secondaryIcon = <i className="ias-icon ias-icon-check_thick" />;
            }

            if (showDuressFingerMode) {
                fingerprintClass += ' duress-finger-mode';
            }
        }
        else {
            if (fingerScanInProgress) {
                fingerprintClass += ' scan';
                secondaryIcon = <i className="ias-icon ias-icon-time_thick" />;
            }
        }

        // Set up click and hover actions, but only if enrollment is allowed & the mode requires it
        const allowFingerAction = enableEnrollment && (showDuressFingerMode || !multiFingerReaderMode);
        let fingerprintTitle = null;
        let handleClick = null;
        let handleKeyPress = null;
        if (allowFingerAction) {
            if (showDuressFingerMode) {
                fingerprintTitle = t.fingerSelectDuress();
            }
            else if (!multiFingerReaderMode) {
                fingerprintTitle = fingerScanned ? t.fingerSelectRemove() : t.fingerSelectScan();
            }

            handleClick = () => onFingerprintClick(id, fingerScanned);
            handleKeyPress = (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleClick();
                }
            };
        }

        const tabIndex = allowFingerAction ? '0' : null;

        return (
            <div
                className={fingerprintClass}
                key={key}
                onClick={handleClick}
                onKeyPress={handleKeyPress}
                style={style}
                title={fingerprintTitle}
                tabIndex={tabIndex}
            >
                <i className="fingerprint-icon ias-icon ias-icon-fingerprint_thin" />
                <div className="fingerprint-secondary-icon">{secondaryIcon}</div>
            </div>
        );
    }

    renderFingerprintElements() {
        const {enableEnrollment, multifingerGroupEnrollable, multifingerGroupEnrolled, multiFingerReaderMode,
            onFingerprintClick, showDuressFingerMode} = this.props;

        const allowMultifingerAction = enableEnrollment && (multiFingerReaderMode && !showDuressFingerMode);

        const fingerprintElements = FINGERTIP_RELATIVE_POSITIONS.map((fingertipPosition, index) =>
            this.renderFingerprintElement(fingertipPosition, index));

        const multifingerTabIndex = allowMultifingerAction ? '0' : null;

        const multifingerElements = MULTIFINGER_DATA.map((data) => {
            const {id, startFingerIndex, endFingerIndex, x, y, height, width} = data;

            if (!multifingerGroupEnrollable(id)) {
                return null;
            }

            const groupEnrolled = multifingerGroupEnrolled(id);
            let handleClick = null;
            let handleKeyPress = null;

            if (allowMultifingerAction) {
                handleClick = () => onFingerprintClick(data.id, groupEnrolled, MULTIFINGER_SCAN_INDEX[id]);

                handleKeyPress = (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        handleClick();
                    }
                };
            }

            let multifingerTitle = null;
            if (allowMultifingerAction) {
                multifingerTitle = groupEnrolled ? t.fingersSelectRemove() : t.fingersSelectScan();
            }

            const style = {
                top: `${y}px`,
                height: `${height}px`,
                width: `${width}px`
            };
            const horizontalStyleRule = (id === MULTIFINGER_IDS.RIGHT_FINGERS) ? 'right' : 'left';
            style[horizontalStyleRule] = `${x}px`;

            let className = 'multifinger';
            if (groupEnrolled) {
                className += ' enrolled';
            }

            const elements = fingerprintElements.slice(startFingerIndex, endFingerIndex);

            // Show an "X" when fully enrolled multifinger element is hovered.
            // Position "X" at top of element where space is available (left/right for fingers, center for thumbs).
            if (groupEnrolled && allowMultifingerAction) {
                const removeStyle = {top: '0'};
                removeStyle[horizontalStyleRule] = '0';
                if (id === MULTIFINGER_IDS.THUMBS) {
                    removeStyle.right = '0';
                }

                elements.push((
                    <div className="remove-multifinger" key="remove-multifinger" style={removeStyle}>
                        <i className="ias-icon ias-icon-close_thick" />
                    </div>
                ));
            }

            return (
                <div
                    className={className}
                    key={id}
                    onClick={handleClick}
                    onKeyPress={handleKeyPress}
                    style={style}
                    tabIndex={multifingerTabIndex}
                    title={multifingerTitle}
                >
                    {elements}

                </div>
            );
        });

        return <div>{multifingerElements}</div>;
    }

    render() {
        const {duressFingerIndex, enableEnrollment, multiFingerReaderMode, showDuressFingerMode} = this.props;

        let handmapClass = 'hand-map';
        if (showDuressFingerMode) {
            handmapClass += ' duress-finger-mode';
        }
        else if (multiFingerReaderMode) {
            handmapClass += ' multifinger-mode';
        }
        else {
            handmapClass += ' standard-mode';
        }

        if (enableEnrollment) {
            handmapClass += ' enable-enrollment';
        }

        const fingerprintElements = this.renderFingerprintElements();
        let legend = null;
        if (duressFingerIndex) {
            legend = (
                <div className="legend">
                    <i className="ias-icon ias-icon-favorite_fill" />
                    <span>{t.fingerDuress()}</span>
                </div>
            );
        }

        return (
            <div className={handmapClass}>
                <img alt={t.hands()} src={process.env.PUBLIC_URL + '/hands.png'} />
                <span className="left-hand-text">{t.handLeft()}</span>
                <span className="right-hand-text">{t.handRight()}</span>
                {fingerprintElements}
                {legend}
            </div>
        );
    }
}

FingerprintHandmap.propTypes = {
    duressFingerIndex: PropTypes.string,
    enableEnrollment: PropTypes.bool.isRequired,
    fingerIsEnrollable: PropTypes.func.isRequired,
    fingersScanned: PropTypes.any.isRequired,
    multiFingerReaderMode: PropTypes.bool.isRequired,
    onFingerprintClick: PropTypes.func.isRequired,
    scanFingerId: PropTypes.string,
    showDuressFingerMode: PropTypes.bool.isRequired
};
