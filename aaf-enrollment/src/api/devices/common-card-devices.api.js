import jsonFetch from '../json-fetch';
import {STATUS_TYPE} from '../../ux/ux';
import {isNetworkError} from '../../actions/error-handlers.actions';
import {randomString} from '../../utils/tools';
import t from '../../i18n/locale-keys';

const CARD_STATUS = {
    NO_CARD: 'NO_CARD',
    CARD_ON: 'CARD_ON',
    NO_SERVICE: 'NO_SERVICE',
    NO_READER: 'NO_READER',
    READER_ON: 'READER_ON'
};

class CommonCardHandler {
    constructor(serviceBase, showStatus, registerPromise) {
        this.cancelCookie = null;
        this.cardPromise = null;
        this.registerPromise = registerPromise;
        this.serviceBase = serviceBase;
        this.showStatus = showStatus;
        this.status = '';
    }

    // Abort the card request by 1) canceling the promise and 2) by telling Device Service to abort the request.
    // The reason we call this when the component unmounts even though the promise was registered with react-trashable
    // is so we can also do #2 as part of this process.
    abortCardPromise = (callback) => {
        if (!this.cardPromise) {
            return;
        }

        this.cardPromise.trash();
        this.cardPromise = null;
        const url = this.serviceBase + '/abort?cancel-cookie=' + this.cancelCookie;
        this.cancelCookie = null;

        return this.registerPromise(
                jsonFetch({url})
            ).then(() => {
                if (callback) {
                    callback();
                }
            });
    };

    getStatus(options) {
        const mode = options.mode || 'nowait';
        this.cancelCookie = randomString(32);
        // We need 'enroll' flag to generate smarfid card serial on enrollment
        const url = this.serviceBase + '/getmessage?' + mode +
                    (options.enroll ? '&enroll' : '') +
                    (mode === 'wait' ? '&cancel-cookie=' + this.cancelCookie : '');

        if (this.cardPromise) {
            this.cardPromise.trash();
            this.cardPromise = null;
        }

        const fetchOptions = {
            url,
            timeout: 600000,    // 10 min
        };

        this.cardPromise = this.registerPromise(
            jsonFetch(fetchOptions)
        );
        this.cardPromise.then(data => {
                this.cardPromise = null;
                this.status = data.result;
                if (data.result === CARD_STATUS.CARD_ON) {
                    options.onCard({
                        cardUid: data.cardid,
                        cardCert: data.cert
                    });
                }
                else if (data.result === CARD_STATUS.READER_ON && this.status !== CARD_STATUS.READER_ON) {
                    // reader was attached, but we don't know if it with the card or w/o
                    // ask reader for card state - NO_CARD or CARD_ON
                    options.mode = 'nowait';
                    this.getStatus(options);
                }
                else if (data.result === CARD_STATUS.NO_READER || data.result === CARD_STATUS.READER_ON
                    || data.result === CARD_STATUS.NO_CARD) {
                    // waiting for reader, card or token presented
                    options.mode = 'wait';
                    this.getStatus(options);
                }
                // If none of the above states matched, we got some unexpected status, so don't retry

                this.updateStatus();
            }).catch((error) => {
                this.cardPromise = null;
                const {data, status, url} = error;

                if (isNetworkError(error)) {        // Cannot connect to Device Service
                    this.status = CARD_STATUS.NO_SERVICE;
                }
                else if (status === 'timeout') {    // Client timeout - abort and reconnect
                    this.abortCardPromise(() => {
                        this.getStatus(options);
                    });
                }
                else if (status === 408) {          // Request timeout - just reconnect
                    this.getStatus(options);
                }
                else {                              // Unexpected error, just log it
                    console.error(url, status, data);
                }

                this.updateStatus();
            });
    }

    getStatusMessage() {
        switch (this.status) {
            case CARD_STATUS.NO_CARD:
                return t.cardWaitingFor();
            case CARD_STATUS.CARD_ON:
                return t.cardDetected();
            case CARD_STATUS.NO_SERVICE:
                return t.cardServiceUnavailable();
            case CARD_STATUS.NO_READER:
                return t.cardReaderNotConnected();
            case CARD_STATUS.READER_ON:
                return t.cardReaderConnected();
            default:
                return t.cardServiceUnexpectedStatus(this.status);
        }
    }

    getStatusType() {
        switch (this.status) {
            case CARD_STATUS.CARD_ON:
                return STATUS_TYPE.INFO;
            case CARD_STATUS.NO_SERVICE:
                return STATUS_TYPE.ERROR;
            case CARD_STATUS.NO_READER:
                return STATUS_TYPE.ERROR;
            default:
                return STATUS_TYPE.INFO;
        }
    }

    updateStatus() {
        this.showStatus(this.getStatusMessage(), this.getStatusType());
    }
}

CommonCardHandler.CARD_SERVICE_URL = 'https://127.0.0.1:8440/api/v1/card';
CommonCardHandler.PKI_SERVICE_URL = 'https://127.0.0.1:8440/api/v1/pki';

export default CommonCardHandler;
