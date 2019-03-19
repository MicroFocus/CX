import './FingerprintMethod.scss';
import React from 'react';
import Authenticator from '../Authenticator';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';
import {Dialog, STATUS_TYPE, StatusIndicator} from '../../../ux/ux';
import {captureFingerprint} from '../../../api/fingerprint';

const LEFT_FINGERTIP_POSITIONS = [
    { id: 2, x: -3, y: 96 },
    { id: 4, x: 49, y: 14 },
    { id: 6, x: 90, y: -3 },
    { id: 8, x: 129, y: 7 },
    { id: 10, x: 162, y: 52 }
];
const RIGHT_FINGERTIP_POSITIONS = LEFT_FINGERTIP_POSITIONS.map((fingerPosition) => {
    return {...fingerPosition, id: fingerPosition.id - 1};
}).reverse();
const FINGERTIP_POSITIONS = LEFT_FINGERTIP_POSITIONS.concat(RIGHT_FINGERTIP_POSITIONS);
const FINGERS_ON_HAND = 5;

const CAPTURE_ANIMATION_DELAY = 1500;

// Note: In this file we will use "scan" to denote all the captures needed to enroll a fingerprint.

class FingerprintMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const fingersScanned = {};

        const {isEnrolled, data} = props.template;
        if (isEnrolled && data && data.fingerPositions) {
            data.fingerPositions.forEach((id) => {
                fingersScanned[id] = true;
            });
        }

        this.state = {                  // UI state, does not include fingerprint images
            confirmationDialog: null,

            scanCapturesComplete: null,
            scanFingerId: null,
            showCaptureAnimation: false,
            fingersScanned
        };

        this.capturePromise = null;
        this.enrolling = false;         // True if user is enrolling rather than viewing authenticator
        this.scans = {};                // Fingerprint images to send to server
    }

    abortCapturePromise() {
        if (this.capturePromise) {
            this.capturePromise.abort();
            this.capturePromise = null;
        }
    }

    authenticationInfoChanged() {
        return this.enrolling;
    }

    cancelConfirmationDialog = () => {
        this.setState({confirmationDialog: null});
    };

    closeConfirmationDialog = () => {
        const callback = this.state.confirmationDialog.callback;
        this.setState({confirmationDialog: null}, callback);
    };

    exitFingerprintScanDialog = () => {
        this.abortCapturePromise();
        this.resetFingerScan();
    };

    componentWillUnmount() {
        this.abortCapturePromise();
    }

    fingerIsEnrollable(id) {
        if (this.getPolicyData().isFingersSpecified) {
            return (this.getPolicyData().fingers.indexOf('' + id) !== -1);
        }

        return true;
    }

    finishEnroll() {
        const scanIds = Object.keys(this.scans);
        const minFingers = this.getPolicyData().fingersNumber;
        if (scanIds.length < minFingers) {
            return Promise.reject(`A minimum of ${minFingers} different fingerprints are required.
               You must scan more fingers`);
        }

        // Loop through all collected image data and convert to proper format
        const captures = [];
        Object.keys(this.scans).forEach((id) => {
            this.scans[id].forEach((image) => {
                captures.push({
                    Finger: id,
                    Image: image
                });
            });
        });

        return this.props.doEnrollWithBeginProcess({captures}, true)
            .then((response) => {
                if (response.status !== 'FAILED') {
                    return Promise.resolve(response);
                }
                else {
                    throw response.msg;
                }
            });
    }

    getNumFingersEnrolled() {
        return Object.keys(this.state.fingersScanned).length;
    }

    // Returns fingerprint policy data. Expected format:
    // { capturesNumberPerFinger: 3
    //   fingers: (4) ["1", "5", "9", "10"]
    //   fingersNumber: 2
    //   isFingersSpecified: true }
    getPolicyData() {
        return this.props.policies.fingerMethod.data;
    }

    handleFingerprintClick(id, fingerScanned) {
        if (this.props.template.isEnrolled && !this.enrolling) {
            this.setState({
                confirmationDialog: {
                    callback: () => {
                        this.enrolling = true;
                        this.setState({fingersScanned: {}}, () => {
                            if (!fingerScanned) {
                                this.scanFinger(id);
                            }
                        });
                    },
                    description: 'This will remove all previously enrolled fingerprints. Are you sure?',
                    label: 'Re-scan fingerprints'
                }
            });
        }
        else {
            this.enrolling = true;

            if (fingerScanned) {
                this.showRemoveFingerConfirmation(id);
            }
            else {
                this.scanFinger(id);
            }
        }
    }

    removeFinger = (id) => {  // Delete finger from both scan data and UI state
        delete this.scans[id];

        const newFingersScanned = {...this.state.fingersScanned};
        delete newFingersScanned[id];
        this.setState({
            fingersScanned: newFingersScanned
        });
    };

    // Reset finger scan. If scan completed, note this in UI state.
    resetFingerScan() {
        const scanFingerId = this.state.scanFingerId;
        let newFingersScanned = null;
        if (scanFingerId && !!this.scans[scanFingerId]) {
            newFingersScanned = {...this.state.fingersScanned, [scanFingerId]: true};
        }
        else {
            newFingersScanned = this.state.fingersScanned;
        }

        this.setState({
            fingersScanned: newFingersScanned,
            scanFingerId: null,
            scanCapturesComplete: null,
            showCaptureAnimation: false
        });
    }

    scanFinger = (id) => {
        this.setState({
            scanCapturesComplete: 0,
            scanFingerId: id
        });

        const scanData = [];

        const captureFinger = () => {
            let captureInProgress = true;
            this.capturePromise = captureFingerprint();
            this.capturePromise
                .finally(() => {
                    captureInProgress = false;
                    this.capturePromise = null;
                })
                .then((captureData) => {
                    this.props.resetStatus();
                    scanData.push(captureData);
                    this.setState({
                        scanCapturesComplete: this.state.scanCapturesComplete + 1,
                        showCaptureAnimation: false
                    }, () => {
                        if (this.state.scanCapturesComplete < this.getPolicyData().capturesNumberPerFinger) {
                            captureFinger();
                        }
                        else {
                            this.scans[id] = scanData;
                        }
                    });
                })
                .catch((error) => {
                    if (error.status === 'abort') {     // Ignore aborted promises
                        return;
                    }

                    this.props.showStatus(error, STATUS_TYPE.ERROR);
                    this.resetFingerScan();
                });

            window.setTimeout(() => {
                if (captureInProgress) {
                    this.setState({showCaptureAnimation: true});
                }
            }, CAPTURE_ANIMATION_DELAY);
        };

        captureFinger();
    };

    showRemoveFingerConfirmation = (id) => {
        this.setState({
            confirmationDialog: {
                callback: () => this.removeFinger(id),
                description: 'Are you sure you wish to remove this fingerprint?',
                label: 'Remove fingerprint'
            }
        });
    };


    renderConfirmationDialog() {
        const {confirmationDialog} = this.state;

        return (
            <Dialog
                onCancel={this.cancelConfirmationDialog}
                onClose={this.closeConfirmationDialog}
                open
                title={
                    <div className="ias-dialog-label">{confirmationDialog.label}</div>
                }
            >
                <p>{confirmationDialog.description}</p>
            </Dialog>
        );
    }

    renderFingerprintElement(fingertipPosition, arrayIndex) {
        const {x, y, id} = fingertipPosition;
        const style = {top: `${y}px`};
        const horizontalStyleRule = (arrayIndex < FINGERS_ON_HAND) ? 'left' : 'right';
        style[horizontalStyleRule] = `${x}px`;
        const key = `fingerprint-${id}`;

        const fingerScanned = this.state.fingersScanned[id];
        const fingerScanInProgress = (this.state.scanFingerId === id);
        let fingerprintClass = 'fingerprint';
        let secondaryIcon = null;
        let fingerprintTitle = null;

        if (fingerScanned) {
            fingerprintTitle = 'Select to remove fingerprint';
            fingerprintClass += ' enrolled';
            secondaryIcon = <i className="ias-icon ias-icon-check_thick" />;
        }
        else {
            fingerprintTitle = 'Select to scan finger';
            if (fingerScanInProgress) {
                fingerprintClass += ' scan';
                secondaryIcon = <i className="ias-icon ias-icon-time_thick" />;
            }
        }

        const handleClick = () => this.handleFingerprintClick(id, fingerScanned);

        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleClick();
            }
        };

        return (
            <div
                className={fingerprintClass}
                key={key}
                onClick={handleClick}
                onKeyPress={handleKeyPress}
                style={style}
                title={fingerprintTitle}
                tabIndex="0"
            >
                <i className="fingerprint-icon ias-icon ias-icon-fingerprint_thin" />
                <div className="fingerprint-secondary-icons">{secondaryIcon}</div>
            </div>
        );
    }

    renderFingerprintScanDialog() {
        const scanMarks = [];
        const numCapturesRequired = this.getPolicyData().capturesNumberPerFinger;

        const scanIncomplete = this.state.scanCapturesComplete < numCapturesRequired;

        for (let captureIndex = 0; captureIndex < numCapturesRequired; captureIndex++) {
            let markClass = 'mark-icon ias-icon ias-icon-check_thick';
            if (captureIndex < this.state.scanCapturesComplete) {
                markClass += ' complete';
            }
            const markElement = <i className={markClass} key={'mark' + captureIndex} />;
            scanMarks.push(markElement);
        }

        let fingerprintImage = null;
        if (this.state.showCaptureAnimation) {
            fingerprintImage = <img alt="Scan in progress" className="capture-animation" src="/fingerprint_scan.gif" />;
        }
        else {
            fingerprintImage = <i className="fingerprint-icon ias-icon ias-icon-fingerprint_thin" />;
        }
        return (
            <Dialog
                addContainerClass="fingerprint-scan-dialog"
                omitActionButtons
                onClose={this.exitFingerprintScanDialog}
                open
                title={<div className="ias-dialog-label">Scan Fingerprint</div>}
            >
                {fingerprintImage}
                <div className="description">Place selected finger on the scanning device to capture fingerprint.</div>
                <div className="scan-marks">{scanMarks}</div>
                <div className="required-scans-message">{numCapturesRequired} scans required</div>
                <div className="description">Lift finger off scanning device after each successful scan.</div>

                <div className="ias-actions">
                    <button
                        className="ias-button"
                        disabled={scanIncomplete}
                        onClick={this.exitFingerprintScanDialog}
                    >
                        Done
                    </button>
                </div>
            </Dialog>
        );
    }

    render() {
        const {scanFingerId} = this.state;

        const fingerprintElements = FINGERTIP_POSITIONS.map((fingertipPosition, index) => {
            if (this.fingerIsEnrollable(fingertipPosition.id)) {
                return this.renderFingerprintElement(fingertipPosition, index);
            }

            return null;
        });

        const fingerprintScanDialog = scanFingerId ? this.renderFingerprintScanDialog() : null;

        const numFingersRemaining = this.getPolicyData().fingersNumber - this.getNumFingersEnrolled();
        let requiredFingersMessage = null;
        if (numFingersRemaining > 0) {
            requiredFingersMessage = (
                <StatusIndicator type={STATUS_TYPE.INFO}>
                    {numFingersRemaining} more fingers are required to enroll
                </StatusIndicator>
            );
        }

        let description = 'The Fingerprint method allows multiple fingerprints to be defined for authentication. '
            + 'Select a finger to enroll and place that finger on the reader. ';

        const capturesNumberPerFinger = this.getPolicyData().capturesNumberPerFinger;
        if (capturesNumberPerFinger > 1) {
            description += 'Each selected finger will be scanned ' + capturesNumberPerFinger
                + ' times to confirm a usable fingerprint. ';
        }
        else {
            description += 'A good fingerprint image is important. ';
        }

        description += 'Please test once fingerprints are defined to validate method.';

        const confirmationDialogElement = this.state.confirmationDialog ? this.renderConfirmationDialog() : null;

        return (
            <Authenticator
                description={description}
                {...this.props}
            >
                {requiredFingersMessage}
                <div className="hand-map">
                    <img alt="Hands" src="/hands.png" />
                    <span className="left-hand-text">Left Hand</span>
                    <span className="right-hand-text">Right Hand</span>
                    {fingerprintElements}
                    <div className="fingerprint-test-button">
                        <TestAuthenticatorButton {...this.props.test} />
                    </div>
                </div>

                {fingerprintScanDialog}
                {confirmationDialogElement}
            </Authenticator>
        );
    }
}

export default FingerprintMethod;
