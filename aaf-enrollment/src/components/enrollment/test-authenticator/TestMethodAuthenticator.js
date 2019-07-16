import AsyncOnlyTest from './method-tests/AsyncOnlyTest';
import BluetoothTest from './method-tests/BluetoothTest';
import CardTest from './method-tests/CardTest';
import DeviceAuthTest from './method-tests/DeviceAuthTest';
import FacialTest from './method-tests/FacialTest';
import FIDO2Test from './method-tests/FIDO2Test';
import FingerprintTest from './method-tests/FingerprintTest';
import {HOMEPAGE_URL} from '../../../actions/navigation.actions';
import {methodIds} from '../../../data/MethodData';
import LDAPPasswordTest from './method-tests/LDAPPasswordTest';
import PasswordOnlyTest from './method-tests/PasswordOnlyTest';
import PKITest from './method-tests/PKITest';
import React from 'react';
import {Redirect} from 'react-router-dom';
import SecurityQuestionsTest from './method-tests/SecurityQuestionsTest';
import SmartphoneTest from './method-tests/SmartphoneTest';
import U2FTest from './method-tests/U2FTest';
import WebAuthenticationTest from './method-tests/WebAuthenticationTest';
import WindowsHelloTest from './method-tests/WindowsHelloTest';

const TestMethodAuthenticator = React.forwardRef(({methodId, ...rest}, ref) => {
    switch (methodId) {
        case methodIds.BANKID:
            return <AsyncOnlyTest ref={ref} {...rest} />;
        case methodIds.BLUETOOTH:
            return <BluetoothTest ref={ref} {...rest} />;
        case methodIds.CARD:
            return <CardTest ref={ref} {...rest} />;
        case methodIds.DEVICE_AUTH:
            return <DeviceAuthTest ref={ref} {...rest} />;
        case methodIds.EMAIL_OTP:
            return <PasswordOnlyTest ref={ref} {...rest} />;
        case methodIds.FACE:
            return <FacialTest ref={ref} {...rest} />;
        case methodIds.FIDO2:
            return <FIDO2Test ref={ref} {...rest} />;
        case methodIds.FINGER:
            return <FingerprintTest ref={ref} {...rest} />;
        case methodIds.HOTP:
            return <PasswordOnlyTest ref={ref} {...rest} />;
        case methodIds.LDAP_PASSWORD:
            return <LDAPPasswordTest ref={ref} {...rest} />;
        case methodIds.PASSWORD:
            return <PasswordOnlyTest ref={ref} {...rest} />;
        case methodIds.PKI:
            return <PKITest ref={ref} {...rest} />;
        case methodIds.RADIUS:
            return <PasswordOnlyTest ref={ref} {...rest} />;
        case methodIds.SECQUEST:
            return <SecurityQuestionsTest ref={ref} {...rest} />;
        case methodIds.SMARTPHONE:
            return <SmartphoneTest ref={ref} {...rest} />;
        case methodIds.SMS_OTP:
            return <PasswordOnlyTest ref={ref} {...rest} />;
        case methodIds.SWISSCOM:
            return <AsyncOnlyTest ref={ref} {...rest} />;
        case methodIds.TOTP:
            return <PasswordOnlyTest ref={ref} {...rest} />;
        case methodIds.U2F:
            return <U2FTest ref={ref} {...rest} />;
        case methodIds.VOICE:
            return <AsyncOnlyTest ref={ref} {...rest} />;
        case methodIds.VOICE_OTP:
            return <PasswordOnlyTest ref={ref} {...rest} />;
        case methodIds.WEBAUTH:
            return <WebAuthenticationTest ref={ref} {...rest} />;
        case methodIds.WINHELLO:
            return <WindowsHelloTest ref={ref} {...rest} />;
        default:
            console.error(`Error: ${methodId} not defined!`);
            return <Redirect to={HOMEPAGE_URL} />;
    }
});

export default TestMethodAuthenticator;
