import React from 'react';
import {STATUS_TYPE} from '../../../../ux/ux';
import * as facial from '../../../../api/devices/facial-device.api';
import t from '../../../../i18n/locale-keys';
import FacialVideo from '../../method-authenticators/FacialVideo';

const FACIAL_VIDEO_KEY = 'Test';

class FacialTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.componentIsMounted = false;
        this.state = {
            faceImg: null,
            showFace: false,
            imgSrc: ''
        };

        this.props.setTestButtonAvailability(false);
    }

    componentDidMount() {
        this.componentIsMounted = true;
        facial.stopCapture();
        this.captureFaceAndSubmitAuth();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
        facial.stopCapture();
    }

    captureFaceAndSubmitAuth() {
        this.props.showStatus(t.faceDetecting(), STATUS_TYPE.INFO);

        this.setState({
            showFace: true
        });

        facial.captureFace(FACIAL_VIDEO_KEY, this.captureFaceCallBack)
            .then((faceImg) => {
                facial.stopCapture();
                this.props.showStatus(t.faceDetected(), STATUS_TYPE.INFO);
                this.setState({
                    faceImg,
                    showFace: false
                });

                this.props.doTestLogon({faceImg});
            }).catch((error) => {
                facial.stopCapture();
                if (error.status === 'timeout') {
                    this.props.markTestComplete(false, t.facialTimeout());
                }
                else {
                    this.props.markTestComplete(false, error);
                }
                // Since this component unmounts when test is complete, don't reset the state
            });
    }

    captureFaceCallBack = (data) => {
        if (this.componentIsMounted) {
            this.setState(data);
        }
    };

    render() {
        const {faceImg, showFace, imgSrc} = this.state;
        return (
            <FacialVideo
                captureDone={!!faceImg}
                facialVideoKey={FACIAL_VIDEO_KEY}
                imgSrc={imgSrc}
                showFace={showFace}
            />
        );
    }
}

export default FacialTest;
