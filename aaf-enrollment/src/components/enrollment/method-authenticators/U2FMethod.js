import React from 'react';
import Authenticator from '../Authenticator';
import u2fApi from 'u2f-api';
import U2FHandler from '../../../api/u2f';
import {STATUS_TYPE} from '../../../ux/ux';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

// const U2F_MSG_NO_SERVICE = 'Cannot reach the local FIDO U2F Service. Ask your admin to enable it.
//     You may use the Google Chrome browser, which has built-in support for U2F';
class U2FMethod extends React.PureComponent {
    returnAppId = 'none';
    constructor(props) {
        super(props);
        this.u2fHandler = new U2FHandler();
        generateFormChangeHandler(this, {});
    }

    handleRegisterDevice = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.beginRegister();
    };

    u2fRegister(registerRequests, signRequests) {
        return u2fApi.isSupported().then((supported) => {
            console.log('isSupported: ', supported);
            const registrar = supported ? this.u2fRegisterBuiltin : this.u2fRegisterService;
            return registrar(registerRequests, signRequests);
        });
    };

    u2fRegisterBuiltin(registerRequests, signRequests) {
        return u2fApi.register(registerRequests, signRequests);
    };

    u2fRegisterService(registerRequests, signRequests) {
        const url = this.u2fHandler.u2fServiceUrl() + '/register';
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        };
        const data = {
            registerRequests,
            signRequests
        };

        if (data) {
            fetchOptions.body = JSON.stringify(data);
            fetchOptions.headers['Content-Type'] = 'application/json';
        }
        console.log('fecthOptions: ', fetchOptions);

        let ok = null;
        let status = null;
        let statusText = null;
        const registerData = registerRequests[0];

        return fetch(url, fetchOptions)
            .then(response => {
                // Format: response = { json: () => Promise, ok: true, status: 200, statusText: 'OK' }
                ok = response.ok;
                status = response.status;
                statusText = response.statusText;

                return response.json();
            }).then(jsonData => {
                return jsonData;
            }).then((data) => {
                console.log('u2fRegisterService fetch data: ', data);
                if (ok) {
                    const returnData = {
                        registrationData: data.registrationData,
                        clientData: data.clientData,
                        appId: registerData.appId,
                        challenge: registerData.challenge,
                        version: registerData.version
                    };

                    console.log('returnData', returnData);
                    return returnData;
                }
                else {
                    const failedResponseData = {data, status,
                    statusText, url};

                    console.log('u2fRegisterService fetch failedResponseData: ', failedResponseData);

                    return Promise.reject(failedResponseData);
                }
            });
    }

    beginRegister() {
        const userId = this.props.authentication.userId;
        const appId = this.u2fHandler.getU2FOriginFromUrl(window.location);

        console.log('AppID:', appId);
        const data = {
            userId,
            appId
        };

        const self = this;
        this.props.doEnrollWithBeginProcess(data, true).then(function(data) {
            console.log('data returned: ', data);
            if (self.resultStatus(data, 'MORE_DATA')) {
                self.props.showStatus(self.u2fHandler.U2F_MSG_TOUCH_DEVICE(), STATUS_TYPE.INFO);

                const cancellation = {
                    cancelled: false
                };

                console.log('Returned: ', data);
                const registerRequests = data.registerRequests;
                const signRequests = data.signRequests;
                console.log('Returned: ', registerRequests, signRequests);

                self.u2fRegister(registerRequests, signRequests)
                    .then((u2fResponse) => {
                        console.log('u2fResponse', u2fResponse);
                        if (cancellation.cancelled) {
                            console.log('u2f.register.callback.cancelled', cancellation.cancelled);
                            return;
                        }

                        console.log('Register Response', JSON.stringify(u2fResponse));

                        self.completeRegister(u2fResponse);
                    }).catch((error) => {
                    console.log('Error', JSON.stringify(error));
                    if (error.metaData.code && error.metaData.code === 4) {
                        self.props.showStatus('This device is already registered', STATUS_TYPE.ERROR);
                        console.log('Device already registered.', error.metaData.type);
                    } else if (error.metaData.code && error.metaData.code === 5) {
                        self.props.showStatus('Timeout. Press "Detect U2F Device" to start again', STATUS_TYPE.WARN);
                        console.log('Timeout', error.metaData.type);
                    }
                });
            }
        });
    }

    completeRegister(u2fResponse) {
        const registerResponse = {registerResponse: u2fResponse};
        //this.setState({data: {registerResponse: u2fResponse}});
        const self = this;
        this.props.doEnrollWithBeginProcess(registerResponse, true).then(response => {
            //this.setEnrollState(data);
            console.log('complete', response);
            if (this.resultStatus(response, 'OK')) {
                this.setState({
                    dataDirty: false
                });
            }

            self.props.showStatus(response.msg, STATUS_TYPE.OK);

            //this.props.onSuccess(data.result);
        }).catch((error) => {
            console.log('Error', error);
        });
    }

    // cancelRegister(cancellation) {
    //   // there is no way to tell device to cancel operation
    //   // it will call register callback with errorCode=5, tell callback to ignore
    //   //cancellation.cancelled = true;
    //   //this.setState(this.getInitialState());
    // };

    resultStatus(data, status) {
        //if (data.status !== status)
        //this.setState($.extend(this.getInitialState(), {tellUser: data.result.msg || _('Error')}));
        return (data.status === status);
    }

    finishEnroll() {
        return Promise.resolve('OK');
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    render() {
        const registerDevice = !this.props.template.isEnrolled ? <button className="ias-button" onClick={this.handleRegisterDevice}>Detect U2F Device</button> : null;

        return (
            <Authenticator
                description="The Universal 2nd Factor (U2F) method uses a YubiKey or similar device for authentication."
                {...this.props}
            >
                {registerDevice}
                <TestAuthenticatorButton {...this.props.test} />
            </Authenticator>
        );
    }
}

export default U2FMethod;