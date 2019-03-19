/* eslint-disable */
import React from 'react';
import Authenticator from '../Authenticator';
import {STATUS_TYPE} from '../../../ux/ux';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import * as facial from '../../../api/facial';
import './FacialMethod.scss';

//TODO convert this to our localization
const _ = (value) => {
    return value;
};

//TODO: convert this localization file
const __ = (value) => {
    return value;
};

class FacialMethod extends React.PureComponent {
    constructor(props) {
        super(props);
        generateFormChangeHandler(this, {
            faceImg: '',
            capture: false,
            img_src: ''
        });
        this._isMounted = false;
        this.enrollSuccess = false;

        this.domIds = { canvas: "canvas",
                        video: "video",
                        canvasSnap: "canvasSnap"}
    }

    beforeDoEnroll = () => {
        delete this.state.capture;
        delete this.state.img_src;
        return this.state;
    }

    handleRegisterDevice = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.startCapture();
    };

    startCapture = () => {
        this.props.showStatus(facial.FACE_DETECTING_MSG(), STATUS_TYPE.INFO);
        this.setState({
            capture: true
        });
        facial.captureFace(this.domIds, this.capturFaceCallBack)
            .then((faceImg) => {
                console.log("Face Detected");
                this.stopCapture();
                this.props.showStatus(facial.FACE_DETECTED_MSG(), STATUS_TYPE.INFO);
                this.setState({
                    capture: false,
                    data: {faceImg}
                });

                const data = {faceImg, userName: this.props.authentication.username};
                this.props.doEnrollWithBeginProcess(data)
                .then((data) => {
                    if (data.status === 'OK') {
                        this.enrollSuccess = true;
                    } else if (data.status === 'FAILED') {
                        this.props.showStatus(data.msg, STATUS_TYPE.WARN);
                        facial.stopCapture();
                    }
                });
            }).finally(() => {
                this.setState({
                    disableActions: true
                });
            }).catch((error) => {
                console.log("error", error);
                if(typeof error === "string" ) {
                    this.props.showStatus(error, STATUS_TYPE.ERROR);
                } else {
                    this.props.showStatus(error.status, STATUS_TYPE.ERROR);
                }

                facial.stopCapture();
                this.setState({
                    enroll: {},
                    data: {
                        faceImg: null
                    },
                    capture: false,
                    img_src: ''
                });
            });
    }

    capturFaceCallBack = (data) => {
        if (this._isMounted) {
            this.setState(data);
        }
    }

    componentDidMount() {
        facial.stopCapture();
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
        facial.stopCapture();
    }

    finishEnroll() {
        if (this.enrollSuccess) {
            return Promise.resolve();
        }
        else {
            return Promise.reject('No image found.');
        }
    };

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    renderFaceForm() {
        const canvasStyle = {position: 'relative', display: this.state.capture ? 'block' : 'none', zIndex: 0};
        const videoStyle = {position: 'absolute', display: this.state.capture ? 'block' : 'none'};
        const canvasSnapStyle = {position: 'absolute', marginTop: 50, display: 'none'};
        const imgStyle = {marginBottom: 30};
        return (
            <div style={{width: '400px', height: '300px', display: 'inline-block', border: '1px dotted black'}}>
            {this.state.img_src ? (
                    <div style={imgStyle}><img id="faceImg" width={400} height={300} name="faceImg" src={this.state.img_src} />
                    </div>) :
                    (<div>
                        <canvas id="canvasSnap" width={400} height={300} style={canvasSnapStyle} />
                        <video id="video" width={400} height={300} preload="none" autoPlay muted style={videoStyle} />
                        <canvas id="canvas" width={400} height={300} style={canvasStyle} />
                     </div>)}
            </div>
        );
    }


    render() {
        return (
            <Authenticator
                description="The Facial Recognition method enables your computer
          webcam to take snapshots of your face for recognition. Please use sufficient
          light when taking facial images that adequately represent your facial characteristics."
                {...this.props}
            >
                {this.renderFaceForm()}
                <div>
                    <button className="ias-button" onClick={this.handleRegisterDevice}>Start Capture</button>
                    <TestAuthenticatorButton {...this.props.test} />
                </div>
            </Authenticator>
        );
    }
}

export default FacialMethod;
