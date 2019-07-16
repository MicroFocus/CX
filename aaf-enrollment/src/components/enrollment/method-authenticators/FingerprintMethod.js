import './FingerprintMethod.scss';
import React from 'react';
import Authenticator from '../Authenticator';
import {Dialog, STATUS_TYPE, StatusIndicator} from '../../../ux/ux';
import {captureFingerprint} from '../../../api/devices/fingerprint-device.api';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import {FingerprintHandmap, MULTIFINGER_IDS, MULTIFINGER_MAP_ORDER} from './FingerprintHandmap';
import t from '../../../i18n/locale-keys';

const CAPTURE_ANIMATION_DELAY = 1500;

// Note: In this file we will use "scan" to denote all the captures needed to enroll a fingerprint.

class FingerprintMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {data, isEnrolled} = this.props.template;
        const policy = this.getPolicyData();
        let duressFingerIndex = null;
        if (policy.enableDuressFinger && isEnrolled) {
            duressFingerIndex = data.duressFingerIndex;
        }
        let multiFingerReaderMode = false;
        if (policy.forceMultiFingerScan) {
            multiFingerReaderMode = true;
        }
        else if (policy.isMultiFingerScanEnabled && isEnrolled) {
            multiFingerReaderMode = data.multiFingerReaderMode;
        }

        const initialFormState = { multiFingerReaderMode };
        const initialOtherState = {              // UI state, does not include fingerprint images
            confirmationDialog: null,
            duressFingerIndex,
            duressFingerMode: false,
            scanCapturesComplete: null,
            scanFingerId: null,
            showCaptureAnimation: false,
            fingersScanned: this.getInitialFingersScanned()
        };

        generateFormChangeHandler(this, initialFormState, initialOtherState);

        this.captureAnimationTimeoutID = null;
        this.capturePromise = null;
        this.enrolling = false;         // True if user is enrolling rather than viewing authenticator
        this.scans = {};                // Fingerprint images to send to server
    }

    abortCapturePromise() {
        if (this.capturePromise) {
            this.capturePromise.trash();
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

    componentWillUnmount() {
        if (this.captureAnimationTimeoutID) {
            clearTimeout(this.captureAnimationTimeoutID);
            this.captureAnimationTimeoutID = null;
        }
    }

    exitDuressFingerMode = () => {
        this.setState({duressFingerMode: false});
    };

    exitFingerprintScanDialog = () => {
        this.abortCapturePromise();
        this.resetFingerScan();
    };

    doEnrollCallback = (response) => {
        if (response.status === 'FAILED') {
            this.props.showStatus(response.msg, STATUS_TYPE.ERROR);
            this.setState({
                fingersScanned: this.getInitialFingersScanned()
            });
        }
    };

    enterDuressFingerMode = () => {
        this.setState({ duressFingerMode: true });
    };

    fingerIsEnrollable = (id) => {
        if (this.getPolicyData().isFingersSpecified) {
            return (this.getPolicyData().fingers.indexOf('' + id) !== -1);
        }

        return true;
    };

    finishEnroll() {
        const minFingers = this.getPolicyData().fingersNumber;
        if (this.getNumFingersEnrolled() < minFingers) {
            return Promise.reject(t.fingersMoreRequiredError());
        }

        const { duressFingerIndex, form: { multiFingerReaderMode} } = this.state;
        const enrollData = {
            duressFingerIndex,
            multiFingerReaderMode,
            operation: 'end'
        };

        return this.props.doEnrollWithBeginProcess(enrollData, false, true).then((response) => {
            if (response.status !== 'FAILED') {
                return Promise.resolve(response);
            }
            else {
                return new Promise((resolve, reject) => {
                    this.setState({
                        fingersScanned: this.getInitialFingersScanned()
                    }, () => reject(response.msg));
                });
            }
        });
    }

    getInitialFingersScanned() {
        const fingersScanned = {};
        const {isEnrolled, data} = this.props.template;
        if (isEnrolled && data && data.fingerPositions) {
            data.fingerPositions.forEach((id) => {
                fingersScanned[id] = true;
            });
        }

        return fingersScanned;
    }

    getNumFingersEnrolled() {
        return Object.keys(this.state.fingersScanned).length;
    }

    // Returns fingerprint policy data. Expected format:
    // { capturesNumberPerFinger: 3,
    //   enableDuressFinger: true,
    //   fingers: (4) ["1", "5", "9", "10"],
    //   fingersNumber: 2,
    //   isFingersSpecified: true,
    //   isMultiFingerScanEnabled: true,
    //   forceMultiFingerScan: true }
    getPolicyData() {
        return this.props.policies.fingerMethod.data;
    }

    handleFingerprintClick = (id, fingerScanned, scanIndex) => {
        this.enrolling = true;

        if (this.state.duressFingerMode) {
            this.setDuressFinger(id);
        }
        else if (fingerScanned) {
            const description = scanIndex ? t.fingersRemoveConfirmation() : t.fingerRemoveConfirmation();
            this.setState({
                confirmationDialog: {
                    callback: () => this.removeFingers(id, scanIndex),
                    description,
                    label: t.fingerRemoveTitle()
                }
            });
        }
        else {
            this.scanFingers(id, scanIndex);
        }
    };

    multifingerGroupEnrollable = (id) => {
        return MULTIFINGER_MAP_ORDER[id].some((fingerId) => this.fingerIsEnrollable(fingerId));
    };

    multifingerGroupEnrolled = (id) => {
        const fingerIds = MULTIFINGER_MAP_ORDER[id].filter((fingerId) => this.fingerIsEnrollable(fingerId));
        return fingerIds.every((fingerId) => !!this.state.fingersScanned[fingerId]);
    };

    removeFingers = (id, scanIndex) => {
        const {duressFingerIndex} = this.state;
        const fingersToRemove = scanIndex ? MULTIFINGER_MAP_ORDER[id] : [id];
        let newDuressFingerIndex = duressFingerIndex;
        const newFingersScanned = {...this.state.fingersScanned};

        fingersToRemove.forEach((fingerId) => {
            delete newFingersScanned[fingerId];
            if (duressFingerIndex === fingerId) {
                newDuressFingerIndex = '';
            }
        });

        this.setState({
            fingersScanned: newFingersScanned,
            duressFingerIndex: newDuressFingerIndex
        });

        const data = {fingers: fingersToRemove, operation: 'remove'};
        this.props.doEnrollWithBeginProcess(data, true, true)
            .then(this.doEnrollCallback);
    };

    // Reset finger scan. If scan completed, note this in UI state & submit scanned fingers
    resetFingerScan() {
        let newFingersScanned = null;
        const scanFingerIds = Object.keys(this.scans);
        if (scanFingerIds.length) {
            newFingersScanned = {...this.state.fingersScanned};
            scanFingerIds.forEach((scanFingerId) => {
                newFingersScanned[scanFingerId] = true;
            });
            this.submitScannedFingers();
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

    scanFingers = (id, scanIndex) => {
        this.setState({
            scanCapturesComplete: 0,
            scanFingerId: id
        });

        const scanData = [];

        const captureFinger = () => {
            let captureInProgress = true;
            this.capturePromise = this.props.registerPromise(
                captureFingerprint(scanIndex)
            );
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
                            if (scanIndex) {
                                const mapOrder = MULTIFINGER_MAP_ORDER[id];
                                for (let mapIndex = 0; mapIndex < mapOrder.length; mapIndex++) {
                                    const fingerId = mapOrder[mapIndex];
                                    if (this.fingerIsEnrollable(fingerId)) {
                                        const fingerScanData = [];
                                        scanData.forEach((captureArray) => {
                                            const fingerCapture = JSON.parse(captureArray[mapIndex]);
                                            fingerScanData.push(fingerCapture);
                                        });
                                        this.scans[fingerId] = fingerScanData;
                                    }
                                }
                            }
                            else {
                                this.scans[id] = scanData;
                            }
                        }
                    });
                })
                .catch((error) => {
                    this.props.showStatus(error, STATUS_TYPE.ERROR);
                    this.resetFingerScan();
                });

            this.captureAnimationTimeoutID = setTimeout(() => {
                if (captureInProgress) {
                    this.setState({showCaptureAnimation: true});
                }
            }, CAPTURE_ANIMATION_DELAY);
        };

        captureFinger();
    };

    setDuressFinger(id) {
        this.setState({
            duressFingerIndex: id
        });
    }

    submitScannedFingers() {
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
        this.scans = {};

        this.props.doEnrollWithBeginProcess({captures, operation: 'add'}, true, true)
            .then(this.doEnrollCallback);
    }

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

    renderDuressFingerDialog() {
        const handmap = this.renderHandmap(true);

        return (
            <Dialog
                addContainerClass="duress-finger-dialog"
                onClose={this.exitDuressFingerMode}
                open
                title={<div className="ias-dialog-label">{t.fingerChooseDuressTitle()}</div>}
            >
                <p>{t.fingerChooseDuressInfo()}</p>
                {handmap}
            </Dialog>
        );
    }

    renderDuressFingerElements() {
        const disableButton = (Object.keys(this.state.fingersScanned).length === 0 || this.props.readonlyMode);

        return (
            <div>
                <button
                    className="ias-button"
                    disabled={disableButton}
                    id="chooseDuressFinger"
                    onClick={this.enterDuressFingerMode}
                    type="button"
                >
                    {t.fingerDuressButton()}
                </button>
            </div>
        );
    }

    renderFingerprintImage(index) {
        let key;
        if (this.state.showCaptureAnimation) {
            key = index + '-progress';
            return (
                <img
                    alt={t.fingerScanning()}
                    className="capture-animation"
                    key={key}
                    src={process.env.PUBLIC_URL + '/fingerprint_scan.gif'}
                />
            );
        }
        else {
            key = index;
            return <i className="fingerprint-icon ias-icon ias-icon-fingerprint_thin" key={key} />;
        }
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

        const fingerprintImages = [];
        const numFingerprintImages = this.state.form.multiFingerReaderMode ? 2 : 1;
        for (let index = 0; index < numFingerprintImages; index++) {
            fingerprintImages.push(this.renderFingerprintImage(index));
        }

        const pluralFingers = this.state.form.multiFingerReaderMode ? t.fingers() : t.finger();
        let chosenFingers = null;
        switch (this.state.scanFingerId) {
            case MULTIFINGER_IDS.LEFT_FINGERS:
                chosenFingers = t.fingersLeft();
                break;
            case MULTIFINGER_IDS.RIGHT_FINGERS:
                chosenFingers = t.fingersRight();
                break;
            case MULTIFINGER_IDS.THUMBS:
                chosenFingers = t.fingersThumbs();
                break;
            default:
                chosenFingers = t.fingerSelected();
                break;
        }

        return (
            <Dialog
                addContainerClass="fingerprint-scan-dialog"
                omitActionButtons
                onClose={this.exitFingerprintScanDialog}
                open
                title={<div className="ias-dialog-label">{t.fingerScanningTitle()}</div>}
            >
                {fingerprintImages}
                <div className="description">{t.fingerPlaceOnScanner(chosenFingers)}</div>
                <div className="scan-marks">{scanMarks}</div>
                <div className="required-scans-message">{t.fingerScansRequired(numCapturesRequired)}</div>
                <div className="description">{t.fingerRemoveAfterScan(pluralFingers)}</div>

                <div className="ias-actions">
                    <button
                        className="ias-button"
                        id="Close_Fingerprint_Scan_Button"
                        disabled={scanIncomplete}
                        onClick={this.exitFingerprintScanDialog}
                    >
                        {t.buttonDone()}
                    </button>
                </div>
            </Dialog>
        );
    }

    renderHandmap(showDuressFingerMode) {
        const {duressFingerIndex, fingersScanned, form: {multiFingerReaderMode}, scanFingerId} = this.state;
        const {fingerIsEnrollable, handleFingerprintClick, multifingerGroupEnrollable, multifingerGroupEnrolled}
            = this;
        const handmapProps = {
            duressFingerIndex,
            enableEnrollment: !this.props.readonlyMode,
            fingerIsEnrollable,
            fingersScanned,
            multifingerGroupEnrollable,
            multifingerGroupEnrolled,
            multiFingerReaderMode,
            onFingerprintClick: handleFingerprintClick,
            scanFingerId,
            showDuressFingerMode
        };
        return <FingerprintHandmap {...handmapProps} />;
    }

    render() {
        const {form: {multiFingerReaderMode}, duressFingerMode, scanFingerId} = this.state;
        const {isMultiFingerScanEnabled, enableDuressFinger, forceMultiFingerScan} = this.getPolicyData();
        const capturesNumberPerFinger = this.getPolicyData().capturesNumberPerFinger;

        let multiFingerSelection = null;
        if (isMultiFingerScanEnabled && !forceMultiFingerScan) {
            multiFingerSelection = (
                <div className="ias-input-container ias-inline">
                    <div>
                        <input
                            checked={multiFingerReaderMode}
                            disabled={this.props.template.isEnrolled || this.props.readonlyMode}
                            id="Multi_Finger_Reader_Mode"
                            name="multiFingerReaderMode"
                            onChange={this.handleChange}
                            type="checkbox"
                        />
                        <label htmlFor="Multi_Finger_Reader_Mode">{t.fingerUseMultiReader()}</label>
                    </div>
                </div>
            );
        }

        const numFingersRemaining = this.getPolicyData().fingersNumber - this.getNumFingersEnrolled();
        let requiredFingersMessage = null;
        if (numFingersRemaining > 0) {
            requiredFingersMessage = (
                <StatusIndicator type={STATUS_TYPE.INFO}>
                    {t.fingersMoreRequired(numFingersRemaining)}
                </StatusIndicator>
            );
        }

        const handmap = this.renderHandmap(false);
        const duressFingerDialog = duressFingerMode ? this.renderDuressFingerDialog() : null;
        const duressFingerElements = enableDuressFinger ? this.renderDuressFingerElements() : null;
        const fingerprintScanDialog = scanFingerId ? this.renderFingerprintScanDialog() : null;
        const confirmationDialogElement = this.state.confirmationDialog ? this.renderConfirmationDialog() : null;

        return (
            <Authenticator
                description={t.fingerMethodDescription(capturesNumberPerFinger)}
                {...this.props}
            >
                {multiFingerSelection}
                {requiredFingersMessage}
                {handmap}
                {duressFingerElements}
                {fingerprintScanDialog}
                {confirmationDialogElement}
                {duressFingerDialog}
            </Authenticator>
        );
    }
}

export default FingerprintMethod;
