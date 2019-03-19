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
            qrcode: new window.QRCode(this.qrcoderef.current, this.props)
        });
    }

    componentWillUnmount() {
        this.state.qrcode.clear();
    }

    render() {
        return <div ref={this.qrcoderef} className="qr-container" />;
    }
  };

  QRCodeComponent.defaultProps = {
    text: '',
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: window.QRCode.CorrectLevel.M,
  };

export default QRCodeComponent;