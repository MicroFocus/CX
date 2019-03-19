import React from 'react';
import {STATUS_TYPE} from '../../../../ux/ux';
import {captureFingerprint} from '../../../../api/fingerprint';

class GenericTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setTestButtonAvailability(false);
        this.props.showStatus('Place your finger on the reader', STATUS_TYPE.INFO);

        this.capturePromise = captureFingerprint();
        this.capturePromise
            .then((capture) => {
                this.capturePromise = null;
                this.props.doTestLogon({capture}, true);
            })
            .catch((error) => {
                if (error.status === 'abort') {     // Ignore aborted promises
                    return;
                }

                this.capturePromise = null;
                this.props.markTestComplete(false, error);
            });
    }

    abortCapturePromise() {
        if (this.capturePromise) {
            this.capturePromise.abort();
            this.capturePromise = null;
        }
    }

    componentWillUnmount() {
        this.abortCapturePromise();
    }

    render() {
        return null;
    }
}

export default GenericTest;
