/* eslint-disable */

import React from 'react';
import jsonFetch from './json-fetch';
import {STATUS_TYPE} from '../ux/ux';
import {isNetworkError} from '../actions/error-handlers.actions';

const tools = require('../utils/tools');

//let _ = Locale._;
const _ = (value) => {
    return value;
};

//let _k = Locale._k;
const _k = (value, value2) => {
    return value;
};

class CommonCardHandler {
    constructor(serviceBase, showStatus) {
        this.serviceBase = serviceBase;
        this.showStatus = showStatus;
        this.cancelCookie = null;
        this.status = '';
        this.isScanning = false;
        this.data = {
            cardUid: '',
            cardCert: ''
        };
    }

    updateUserMsg() {
        if (this.isScanning) {
            this.showStatus(this.userMsg(), this.className());
        }
    }

    userMsg() {
        if (this.status == 'NO_CARD') return _k('Waiting for the card.', 'method.smartcard.waiting_for_card');
        else if (this.status == 'CARD_ON') return _k('Card has been detected', 'method.smartcard.card_has_been_detected');
        else if (this.status == 'NO_SERVICE') return _k('Card service is unavailable', 'method.smartcard.card_service_unavailable');
        else if (this.status == 'NO_READER') return _k('Card reader has not been detected',
                        'method.smartcard.card_reader_not_detected');
        else if (this.status == 'READER_ON') return _k('Card reader is connected', 'method.smartcard.card_reader_connected');
        return _k('Unexpected service status: '/*${status}*/ + this.status,
                    'method.smartcard.unexpected_service_status', {status: this.status});
    }

    className() {
        if (this.status === 'CARD_ON') return STATUS_TYPE.OK;  //success
        else if (this.status === 'NO_SERVICE') return STATUS_TYPE.ERROR; //"danger";
        else if (this.status === 'NO_READER') return STATUS_TYPE.WARN;  //"warning";
        return STATUS_TYPE.INFO; //"info";
    }

    getStatus(options) {
        this.isScanning = true;

        const mode = options.mode || 'nowait';
        this.cancelCookie = tools.randomString(32);
        // We need 'enroll' flag to generate smarfid card serial on enrollment
        const url = this.serviceBase + '/getmessage' + '?' + mode +
                    (options.enroll ? '&enroll' : '') +
                    (mode == 'wait' ? '&cancel-cookie=' + this.cancelCookie : '');

        console.log('getStatus', options, url);

        if (this.xhr) this.xhr.abort();

        const fetchOptions = {
            url,
            method: 'POST',
            data: this.data,
            timeout: 600000,
        };

        this.xhr = jsonFetch(fetchOptions);
        this.xhr.then(data => {
                console.log('success', url, data);
                if (data.result === 'CARD_ON') {
                    this.data = {
                        cardUid: data.cardid,
                        cardCert: data.cert
                    };
                    this.status = data.result;
                    options.onCard(this.data);
                } else if (data.result === 'READER_ON' && this.status !== 'READER_ON') {
                    // reader was attached, but we don't know if it with the card or w/o
                    // ask reader for card state - NO_CARD or CARD_ON
                    options.mode = 'nowait';
                    this.status = data.result;
                    this.getStatus(options);
                } else if (data.result === 'NO_READER' || data.result === 'READER_ON' ||
                            data.result === 'NO_CARD') {
                    // waiting for reader, card or token presented
                    options.mode = 'wait';
                    this.status = data.result;
                    this.getStatus(options);
                } else {
                    // got some unexpected status
                    this.status = data.result;
                }
                this.updateUserMsg();
            }).catch((error) => {
                const {data, status, url} = error;
                console.log('catch error', error);

                if (isNetworkError(error)) {
                    // Cannot connect to Device Service
                    this.status = 'NO_SERVICE';
                }
                // dont use ajax.always() - immediately change status
                // - we may call getStatus() again and always() will be called later
                else if (status === 'timeout') {
                    console.log('Client timeout, abort and reconnect', options);
                    this.abort(() => {
                        this.getStatus(options);
                    });
                } else if (status === 'abort') {
                    // important! when we close the form, we abort request,
                    // so ignore error and abort service waiting
                    this.abort();
                } else if (status === 408) {   //TODO:  need to verify data.status need to  will have this code
                    this.getStatus(options);
                } else {
                    console.error(url, status, data);
                }

                this.updateUserMsg();
            });
    }

    abort = (callback) => {
        this.isScanning = false;

        const url = this.serviceBase + '/abort?cancel-cookie=' + this.cancelCookie;
        const fetchOptions = {
            url,
        };

        return jsonFetch(fetchOptions)
            .then(data => {
                if (callback) {
                    callback();
                }
            });
    };

    render() {
        return (
            null
        );
    }
};

CommonCardHandler.CARD_SERVICE_URL = 'https://127.0.0.1:8440/api/v1/card';
CommonCardHandler.PKI_SERVICE_URL = 'https://127.0.0.1:8440/api/v1/pki';

export default CommonCardHandler;
