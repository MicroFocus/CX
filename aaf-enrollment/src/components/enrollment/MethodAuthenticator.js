import BankIdMethod from './method-authenticators/BankIdMethod';
import BluetoothMethod from './method-authenticators/BluetoothMethod';
import CardMethod from './method-authenticators/CardMethod';
import DeviceAuthMethod from './method-authenticators/DeviceAuthMethod';
import EmailOTPMethod from './method-authenticators/EmailOTPMethod';
import EmergencyPasswordMethod from './method-authenticators/EmergencyPasswordMethod';
import FacialMethod from './method-authenticators/FacialMethod';
import FingerprintMethod from './method-authenticators/FingerprintMethod';
import {HOMEPAGE_URL} from '../../actions/navigation.actions';
import HOTPMethod from './method-authenticators/HOTPMethod';
import {methodIds} from '../../data/MethodData';
import LDAPPasswordMethod from './method-authenticators/LDAPPasswordMethod';
import PasswordMethod from './method-authenticators/PasswordMethod';
import PKIMethod from './method-authenticators/PKIMethod';
import RadiusMethod from './method-authenticators/RadiusMethod';
import React from 'react';
import {Redirect} from 'react-router-dom';
import SecurityQuestionsMethod from './method-authenticators/SecurityQuestionsMethod';
import SmartphoneMethod from './method-authenticators/SmartphoneMethod';
import SMSOTPMethod from './method-authenticators/SMSOTPMethod';
import TOTPMethod from './method-authenticators/TOTPMethod';
import U2FMethod from './method-authenticators/U2FMethod';
import VoiceMethod from './method-authenticators/VoiceMethod';
import VoiceOTPMethod from './method-authenticators/VoiceOTPMethod';
import WebAuthenticationMethod from './method-authenticators/WebAuthenticationMethod';
import WindowsHelloMethod from './method-authenticators/WindowsHelloMethod';
import Oauth2Method from './method-authenticators/Oauth2Method';
import SwisscomMethod from './method-authenticators/SwisscomMethod';
import FIDO2Method from './method-authenticators/FIDO2Method';

const MethodAuthenticator = React.forwardRef(({methodId, ...rest}, ref) => {
    switch (methodId) {
        case methodIds.BANKID:
            return <BankIdMethod ref={ref} {...rest} />;
        case methodIds.BLUETOOTH:
            return <BluetoothMethod ref={ref} {...rest} />;
        case methodIds.CARD:
            return <CardMethod ref={ref} {...rest} />;
        case methodIds.DEVICE_AUTH:
            return <DeviceAuthMethod ref={ref} {...rest} />;
        case methodIds.EMAIL_OTP:
            return <EmailOTPMethod ref={ref} {...rest} />;
        case methodIds.EMERG_PASSWORD:
            return <EmergencyPasswordMethod ref={ref} {...rest} />;
        case methodIds.FACE:
            return <FacialMethod ref={ref} {...rest} />;
        case methodIds.FIDO2:
            return <FIDO2Method ref={ref} {...rest} />;
        case methodIds.FINGER:
            return <FingerprintMethod ref={ref} {...rest} />;
        case methodIds.HOTP:
            return <HOTPMethod ref={ref} {...rest} />;
        case methodIds.LDAP_PASSWORD:
            return <LDAPPasswordMethod ref={ref} {...rest} />;
        case methodIds.OAUTH2:
            return <Oauth2Method ref={ref} {...rest} />;
        case methodIds.PASSWORD:
            return <PasswordMethod ref={ref} {...rest} />;
        case methodIds.PKI:
            return <PKIMethod ref={ref} {...rest} />;
        case methodIds.RADIUS:
            return <RadiusMethod ref={ref} {...rest} />;
        case methodIds.SECQUEST:
            return <SecurityQuestionsMethod ref={ref} {...rest} />;
        case methodIds.SMARTPHONE:
            return <SmartphoneMethod ref={ref} {...rest} />;
        case methodIds.SMS_OTP:
            return <SMSOTPMethod ref={ref} {...rest} />;
        case methodIds.SWISSCOM:
            return <SwisscomMethod ref={ref} {...rest} />;
        case methodIds.TOTP:
            return <TOTPMethod ref={ref} {...rest} />;
        case methodIds.U2F:
            return <U2FMethod ref={ref} {...rest} />;
        case methodIds.VOICE:
            return <VoiceMethod ref={ref} {...rest} />;
        case methodIds.VOICE_OTP:
            return <VoiceOTPMethod ref={ref} {...rest} />;
        case methodIds.WEBAUTH:
            return <WebAuthenticationMethod ref={ref} {...rest} />;
        case methodIds.WINHELLO:
            return <WindowsHelloMethod ref={ref} {...rest} />;
        default:
            console.error(`Error: ${methodId} not defined!`);
            return <Redirect to={HOMEPAGE_URL} />;
    }
});

export default MethodAuthenticator;
