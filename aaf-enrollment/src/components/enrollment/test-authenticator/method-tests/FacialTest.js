/* eslint-disable */
import React from 'react';
import {STATUS_TYPE, StatusIndicator} from '../../../../ux/ux';
import * as facial from '../../../../api/facial';

//TODO convert this to our localization
const _ = (value) => {
    return value;
};

class FacialTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.state = {capture: false};

        this.props.setTestButtonAvailability(false);

        this.domIds = { canvas: "canvasTest",
                        video: "videoTest",
                        canvasSnap: "canvasSnapTest"}
    }

    componentDidMount() {
        this._isMounted = true;
        facial.stopCapture();
        this.captureFaceAndSubmitAuth();
    }

    componentWillUnmount() {
        this._isMounted = false;
        facial.stopCapture();
    }

    captureFaceAndSubmitAuth() {
        this.props.showStatus(facial.FACE_DETECTING_MSG(), STATUS_TYPE.INFO);

        this.setState({
            capture: true
        });

        facial.captureFace(this.domIds, this.capturFaceCallBack)
        .then((faceImg) => {
            facial.stopCapture();
            this.props.showStatus(facial.FACE_DETECTED_MSG(), STATUS_TYPE.INFO);
            this.setState({
                data: {face_img: faceImg},
                capture: false});

            this.props.doTestLogon({faceImg});
        }).catch((errMsg) => {
            facial.stopCapture();
            this.setState({
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
                        <canvas id="canvasSnapTest" width={400} height={300} style={canvasSnapStyle} />
                        <video id="videoTest" width={400} height={300} preload="none" autoPlay muted style={videoStyle} />
                        <canvas id="canvasTest" width={400} height={300} style={canvasStyle} />
                     </div>)}
            </div>
        );
    }


    render() {
        return this.renderFaceForm();
    }
}

export default FacialTest;
