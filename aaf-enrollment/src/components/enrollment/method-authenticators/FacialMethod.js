import './FacialMethod.scss';
import Authenticator from '../Authenticator';
import FacialVideo from './FacialVideo';
import React from 'react';
import {STATUS_TYPE} from '../../../ux/ux';
import t from '../../../i18n/locale-keys';
import * as facial from '../../../api/devices/facial-device.api';

const FACIAL_VIDEO_KEY = 'Enroll';

class FacialMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            captureStarted: false,
            faceImg: null,
            showFace: false,
            imgSrc: ''
        };

        this.componentIsMounted = false;
    }

    authenticationInfoChanged() {
        return this.state.captureStarted;
    }

    authenticationInfoSavable() {
        return false;
    }

    captureFaceCallBack = (data) => {
        if (this.componentIsMounted) {
            this.setState(data);
        }
    };

    componentDidMount() {
        facial.stopCapture();
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
        facial.stopCapture();
    }

    startCapture = () => {
        this.props.showStatus(t.faceDetecting(), STATUS_TYPE.INFO);
        this.setState({
            captureStarted: true,
            showFace: true
        });
        this.props.registerPromise(
                facial.captureFace(FACIAL_VIDEO_KEY, this.captureFaceCallBack)
            ).then((faceImg) => {
                facial.stopCapture();
                this.props.showStatus(t.faceDetected(), STATUS_TYPE.INFO);
                this.setState({
                    showFace: false,
                    faceImg
                });

                const enrollData = {
                    faceImg,
                    userName: this.props.authentication.username
                };

                this.props.doEnrollWithBeginProcess(enrollData)
                    .then((data) => {
                        // Unlike other methods with async enrollment, the Facial enrollment only returns an empty
                        // string on success instead of the expected 'Enrollment is complete' message.
                        // To avoid this problem, let's set a success message if string is blank.
                        if (data.status === 'OK') {
                            const message = data.msg || t.enrollmentComplete();
                            this.props.showStatus(message, STATUS_TYPE.OK);
                        }
                        else {
                            this.props.showStatus(data.msg, STATUS_TYPE.ERROR);
                        }
                    });
            }).catch((error) => {
                if (error.status === 'timeout') {
                    this.props.showStatus(t.facialTimeout(), STATUS_TYPE.ERROR);
                }
                else {
                    this.props.showStatus(error, STATUS_TYPE.ERROR);
                }

                facial.stopCapture();
                this.setState({
                    faceImg: null,
                    showFace: false,
                    imgSrc: ''
                });
            });
    };

    render() {
        const {captureStarted, faceImg, showFace, imgSrc} = this.state;
        const captureDone = !!faceImg || (this.props.template.isEnrolled && !captureStarted);

        return (
            <Authenticator
                description={t.facialMethodDescription()}
                {...this.props}
            >
                <FacialVideo
                    captureDone={captureDone}
                    facialVideoKey={FACIAL_VIDEO_KEY}
                    imgSrc={imgSrc}
                    showFace={showFace}
                />
                <div>
                    <button
                        className="ias-button"
                        disabled={this.props.readonlyMode || this.state.captureStarted}
                        id="Capture_Button"
                        onClick={this.startCapture}
                        type="button"
                    >
                        {t.facialStartCapture()}
                    </button>
                </div>
            </Authenticator>
        );
    }
}

export default FacialMethod;
