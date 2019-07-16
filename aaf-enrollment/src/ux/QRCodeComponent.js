import React from 'react';

class QRCodeComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            qrcode: null
        };

        this.qrcoderef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            qrcode: new window.QRCode(this.qrcoderef.current, this.getOptions())
        });
    }

    componentWillUnmount() {
        this.state.qrcode.clear();
    }

    getOptions() {
        return {
            text: this.props.text || '',
            width: 256,
            height: 256,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: window.QRCode.CorrectLevel.M
        };
    }

    render() {
        return <div ref={this.qrcoderef} className="authenticator-section qr-container" />;
    }
};

export default QRCodeComponent;
