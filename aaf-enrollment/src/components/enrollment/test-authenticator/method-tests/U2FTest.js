/* eslint-disable */
import React from 'react';
import {STATUS_TYPE, StatusIndicator} from '../../../../ux/ux';
import U2FHandler from '../../../../api/u2f';
import u2fApi from 'u2f-api';

class U2FTest extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props.setTestButtonAvailability(false);
        this.u2fHandler = new U2FHandler();

        const appId = this.u2fHandler.getU2FOriginFromUrl(window.location);

        this.props.doTestLogon({appId})
            .then((response) =>{
                console.log('doLogin: ', response);
                if (response.status === 'MORE_DATA') {
                    const signRequest = response.signRequests[0];
                    const challenge = signRequest.challenge; 
                    
                    // no matter which challenge to remember, will cancel all
                    //delete U2F_cancellations[challenge];
        
                    this.props.showStatus(this.u2fHandler.U2F_MSG_TOUCH_DEVICE(), STATUS_TYPE.INFO);
        
                    this.u2fSign(response.signRequests)
                        .then((u2fResponse) => {
                            console.log("u2fSign: ", {signResponse: u2fResponse});

                            //if (U2F_cancellations[challenge])
                            //    return;

                            this.props.doTestLogon({signResponse: u2fResponse}, true); 
                        }).catch((error) => {
                            console.log("error", error);

                        });
                }
            });
    }

    u2fSign(signRequests) {
        return u2fApi.isSupported().then((supported) => {
            console.log('isSupported: ', supported);
            const signer = supported ? this.u2fSignBuiltin : this.u2fSignService;
            return signer(signRequests);
        });
    }
    
    u2fSignBuiltin = (signRequests) => {
        return u2fApi.sign(signRequests);
    }
    
    u2fSignService = (signRequests) => {
        const sr = {signRequests};
        const url = this.u2fHandler.u2fServiceUrl() + '/sign';
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        };

        if (sr) {
            fetchOptions.body = JSON.stringify(sr);
            fetchOptions.headers['Content-Type'] = 'application/json';
        }
        console.log('fecthOptions: ', fetchOptions);

        let ok = null;
        let status = null;
        let statusText = null;

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
                    console.log('returnData', data);
                    return data;
                } else {
                    const failedResponseData = {data, status,
                    statusText, url};

                    console.log('u2fRegisterService fetch failedResponseData: ', failedResponseData);

                    return Promise.reject(failedResponseData);
                }
            });
    }
    
    render() {
        return null;
   }

}

export default U2FTest;
