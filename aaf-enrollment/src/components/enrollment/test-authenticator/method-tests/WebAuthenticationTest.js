import React from 'react';
import {clearStorageItem, loadStorageItem, saveStorageItem} from '../../../../utils/local-storage';

const LOGON_PROCESS_ID_KEY = 'LOGON_PROCESS_ID';

// Tests web authentication in two phases.
// The first redirects the user, the second sets the logon state and waits for the identity provider response
class WebAuthenticationTest extends React.PureComponent {
    constructor(props) {
        super(props);
        const { doTestLogon, getLogonProcessId, query, setAsyncLogon, setLogonState, setTestButtonAvailability } =
            this.props;

        setTestButtonAvailability(false);

        // Check for redirect query strings. Note that our api request function converts the keys to snake case
        if (query.finish_test) {
            // In the second phase, wait for the identity provider response. No callback is needed because status
            // is displayed in doTestLogon.
            const logonProcessId = loadStorageItem(LOGON_PROCESS_ID_KEY);
            clearStorageItem(LOGON_PROCESS_ID_KEY);
            setLogonState(logonProcessId);
            setAsyncLogon(() => {
                this.props.resetQuery();
            }, true);
            return;
        }

        // In the first phase, redirect user so web authentication can occur
        const urlWithoutQueryString = window.location.href.split('?')[0];
        const data = {
            finalRedirection: {
                action: urlWithoutQueryString,
                method: 'GET',
                data: {
                    ...query,
                    finishTest: true
                }
            }
        };

        doTestLogon(data).then((result) => {
            const logonProcessId = getLogonProcessId();
            saveStorageItem(LOGON_PROCESS_ID_KEY, logonProcessId);
            if (result.status === 'MORE_DATA') {
                const url = `${this.getWebAuthSiteUrl()}/${logonProcessId}/login`;
                window.open(url, '_self');
            }
        });
    }

    getWebAuthSiteUrl() {
        return this.props.policies.webAuthMethod.publicUrl.siteUrlCurrent;
    }

    render() {
        return null;
    }
}

export default WebAuthenticationTest;
