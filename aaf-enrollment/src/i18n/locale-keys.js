/* eslint new-cap: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint max-len: 0 */
/* eslint no-template-curly-in-string: 0 */

// This file contains all localization strings for this project. In order to simplify other JS files, the natural
// language keys are kept here, allowing other files to use translations by simply calling the methods below.
// The custom messages (i.e. uses of _k) are implemented, except for the 'Password' string, which has several
// different values depending on which method the authenticator is. Due to the complexity we have opted not to add it
// for now.

const ABOUT_COPYRIGHT_YEAR_RANGE = '2013-2019';
const COMPANY_NAME = 'Micro Focus';
const PRODUCT_BUILD_SHORT = 'NAAF 6.3';
const PRODUCT_COMPANY_NAME = 'NetIQ';
const SMARTPHONE_APP_COMPANY_NAME = 'NetIQ';
const UI_VERSION = 'v1.0';

// These dummy translation functions are used for the time being but may be ripped out after i18next is added
// TODO: implement translations for production environment
const _ = (key, interpolationObject) => interpolate(key, interpolationObject);
// eslint-disable-next-line
const _k = (key, customMessageKey, interpolationObject) => interpolate(key, interpolationObject);
function interpolate(input, interpolationObject) {
    if (!interpolationObject) {
        return input;
    }

    return input.replace(/\${([^}]+)}/g, (match, interpolationKey) => {
        if (!interpolationObject[interpolationKey]) {
            console.error('No ' + interpolationKey + ' in ' + input);
        }
        return interpolationObject[interpolationKey];
    });
}

const t = {
    about: () => _('About'),
    aboutCompanyLogo: () => _('${companyName} logo',
        {
            companyName: COMPANY_NAME
        }),
    aboutCopyright: () => _('© ${year} ${company} Inc. All rights reserved.',
        {
            company: PRODUCT_COMPANY_NAME,
            year: ABOUT_COPYRIGHT_YEAR_RANGE
        }),
    aboutDescription: () => _('Advanced Authentication is a product created by ${company} to provide users the ability to enroll in advanced login methods for authentication and to use those when signing in to their organization\'s site.',
        {
            company: COMPANY_NAME
        }),
    aboutGroupLogo: () => _('Identity, Access, and Security group logo'),
    addLabel: () => _('Add'),
    authenticatorCategory: () => _('Category'),
    authenticatorDefaultCategory: () => _('Default'),
    authenticatorDelete: () => _('Delete Enrollment'),
    authenticatorDeleted: (name) => _('The "${name}" authenticator has been deleted.',
        {name}),
    authenticatorDeleteWarning: () => _('Are you sure you want to delete this authenticator?'),
    authenticatorDeleteWarningTitle: () => _('Delete authenticator'),
    authenticatorEnrolled: () => _('Enrolled'),
    authenticatorEnrolledNavBarTitle: (name) => _('${name} (Enrolled)',
        {name}),
    authenticatorNew: (methodName) => _('New ${methodName}',
        {methodName}),
    authenticatorPossessive: (methodName) => _('My ${methodName}',
        {methodName}),
    authenticatorSaved: (name) => _('The "${name}" authenticator has been saved.',
        {name}),
    authenticatorsDelete: () => _('Delete all Enrollments'),
    authenticatorsDeleted: () => _('Your authentication methods have been deleted.'),
    authenticatorsDeleteWarning: () => _('Are you sure you want to remove all authentication enrollments?'),
    authenticatorsDeleteWarningTitle: () => _('Delete All Enrollments'),
    authenticatorSelectDescription: () => _('Multiple enrollment methods exist. Select a method or define a new method.'),
    authenticatorSelectSubtitle: (method) => _('Your Enrolled ${method} Methods',
        {method}),
    authenticatorSelectTitle: () => _('Select Authentication Method'),
    authenticatorUnenrollableDescription: () => _('This method is managed by your administrator. There is nothing to configure.'),
    availableChainsSelectDescription: () => _('Select an authentication sequence for enrollment. Once enrolled, the sequence can be used for sign in. ${otpExplanation}',
        {
            otpExplanation: t.otpExplanation()
        }),
    availableChainsSelectTitle: () => _('Available Sequences for Enrollment'),
    availableMethodsSelectDescription: () => _('Select an authentication method for enrollment. Once enrolled, the method can be used for sign in. ${otpExplanation}',
        {
            otpExplanation: t.otpExplanation()
        }),
    availableMethodsSelectTitle: () => _('Available Methods for Enrollment'),
    badRequest: () => _('Bad request'),
    bankIdId: () => _('Personal ID (SSN)'),
    bankIdMethodDescription: () => _('BankID is a highly trusted digital identification service for Swedish citizens. With access to Swedish BankID from Nets, you can authenticate any person online, carry out secure transactions, establish and maintain good customer relations, and enter into and sign legally binding agreements.'),
    bankIdNoId: () => _('No personal id entered.'),
    bluetoothEnrolled: () => _('(Enrolled)'),
    bluetoothEnrolledUnconnected: () => _('(Enrolled, but not connected)'),
    bluetoothGetDevices: () => _('Search for Devices'),
    bluetoothMethodDescription: () => _('The Bluetooth Method allows you to authenticate using any Bluetooth-enabled device that is within range.'),
    bluetoothNoDevices: () => _('No Bluetooth devices found'),
    bluetoothSelectDevice: () => _('Select the device from the list to enroll or click ${buttonName} to check the enrolled device',
        {
            buttonName: t.buttonTestMethod()
        }),
    bluetoothServiceUnavailable: () => _k('Bluetooth service is not available',
        'method.bluetooth.service_is_not_available'),
    bluetoothServiceError: () => _('Bluetooth service error'),
    bluetoothTurnedOff: () => _('Bluetooth is turned off'),
    bluetoothWaitingForService: () => _k('Waiting for the Bluetooth service',
        'method.bluetooth.waiting_for_service'),
    buttonBack: () => _('Back'),
    buttonCancel: () => _('Cancel'),
    buttonClose: () => _('Close'),
    buttonDone: () => _('Done'),
    buttonFinish: () => _('Finish'),
    buttonGetQRCode: () => _('Get QR Code'),
    buttonNext: () => _('Next'),
    buttonOk: () => _('OK'),
    buttonSave: () => _('Save'),
    buttonStart: () => _('Start'),
    buttonTest: () => _('Test'),
    buttonTestMethod: () => _('Test Method'),
    cardDetected: () => _('Card has been detected', 'method.smartcard.card_has_been_detected'),
    cardMethodDescription: () => _('The Card method uses a digital card with an entered PIN or password. The card info and PIN are stored in ${company} Advanced Authentication not connected to your corporate directory.',
        {
            company: PRODUCT_COMPANY_NAME
        }),
    cardReaderConnected: () => _('Card reader is connected', 'method.smartcard.card_reader_connected'),
    cardReaderNotConnected: () => _('Card reader has not been detected', 'method.smartcard.card_reader_not_detected'),
    cardScan: () => _('Scan Card'),
    cardServiceUnavailable: () => _('Card service is unavailable', 'method.smartcard.card_service_unavailable'),
    cardServiceUnexpectedStatus: (status) => _k('Unexpected service status: ${status}',
        'method.smartcard.unexpected_service_status',
        {status}),
    cardWaitingFor: () => _('Waiting for the card', 'method.smartcard.waiting_for_card'),
    chainEnrollmentInstructions: () => _('Enroll these methods to enable the sequence authentication'),
    companyLogo: () => _('Company logo'),
    configurationNotSupported: () => _('Configuration is not supported'),
    directoryFrom: () => _('(from corporate directory)'),
    displayName: () => _('Display Name'),
    emailOTPMethodDescription: () => _('The Email OTP method sends an email with a One-time Password (OTP). Use the OTP to authenticate within a specified timeframe.'),
    emailOverride: () => _('To override for this method, enter ${inputFieldName}',
        {
            inputFieldName: t.emailOverrideLabel()
        }),
    emailOverrideLabel: () => _('Override Email'),
    emailPossessive: () => _('Your email'),
    emergencyPwMethodDescription: () => _('The Emergency Password method allows for a specific number of sign-ins. It is a password stored in ${company} Advanced Authentication not connected to your corporate directory. This can be a PIN or a simple password.',
        {
            company: PRODUCT_COMPANY_NAME
        }),
    enrolledChainsSubtitle: () => _('Your Enrolled Sequences for sign in'),
    enrolledMethodsDescription: () => _('Enrolled methods are authenticators that you have already enrolled, and can be used to sign in. ${otpExplanation}',
        {
            otpExplanation: t.otpExplanation()
        }),
    enrolledMethodsSubtitle: () => _('Your Enrolled Single Methods for sign in'),
    enrolledMethodsTitle: () => _('Authentication Methods'),
    enrollmentComplete: () => _('Enrollment is complete'),
    enrollmentConsentDescription: () => _('By enrolling in this system you consent to our storing your enrollment data to validate your identity upon future authentication requests. The data may also be used to send communications (most often login tokens) via email, SMS, push message, voice call or other methods. The data may can be used for internal analytics, forensics, and troubleshooting. We always treat your personal data with the highest security and we do not share any data elements. You have the right to withdraw this consent at any time using the Delete all Enrollments button on the enrollment web page.'),
    enrollmentConsentTitle: () => _('Enrollment Consent'),
    face: () => _('Face'),
    faceDetected: () => _('Face detected'),
    faceDetecting: () => _('Detecting a face'),
    facialMethodDescription: () => _('The Facial Recognition method enables your computer webcam to take snapshots of your face for recognition. Please use sufficient light when taking facial images that adequately represent your facial characteristics.'),
    facialTimeout: () => _('Timeout'),
    facialStartCapture: () => _('Start Capture'),
    fido2DetectDevice: () => _('Detect Device'),
    fido2Error: () => _('Failed'),
    fido2MethodDescription: () => _('The FIDO2 method is an improvement to the FIDO U2F method that uses the Web Authentication standard, offering a high degree of security even without an accompanying password. FIDO2 can authenticate using phones, U2F devices, and more.'),
    finger: () => _('finger'),
    fingerCapturePluralInstruction: (captureTimes) => _('Each selected finger will be scanned ${captureTimes} times to confirm a usable fingerprint.',
        {captureTimes}),
    fingerCaptureSingularInstruction: () => _('A good fingerprint image is important.'),
    fingerChooseDuressInfo: () => _('Only authenticate with the duress finger under a threat or emergency situation. Choose a duress finger by selecting an enrolled finger.'),
    fingerChooseDuressTitle: () => _('Choose Duress Finger'),
    fingerDetectFailed: () => _('Unable to detect the fingers'),
    fingerDuress: () => _('Duress finger'),
    fingerDuressButton: () => _('Duress Finger'),
    fingerFakeError: () => _k('Unable to detect fingers',
        'method.fingerprint.fake_finger'),
    fingerIndexError: () => _k('Unable to scan the fingers. Try again',
        'method.fingerprint.index_error'),
    fingerIncorrectMode: () => _k('Invalid configuration. Please contact your administrator',
        'method.fingerprint.incorrect_mode'),
    fingerMethodDescription: (captureTimes) => _('The Fingerprint method allows multiple fingerprints to be defined for authentication. Select a finger to enroll and place that finger on the reader. ${captureInstruction} Please test once fingerprints are defined to validate method.',
        {
            captureInstruction: (captureTimes > 1)
                ? t.fingerCapturePluralInstruction(captureTimes)
                : t.fingerCaptureSingularInstruction()
        }),
    fingerPlace: () => _k('Place your finger on the reader',
        'method.fingerprint.put_your_finger'),
    fingerPlaceOnScanner: (chosenFingers) => _('Place ${chosenFingers} on the scanning device to capture fingerprint.',
        {chosenFingers}),
    fingerReaderNotConnected: () => _k('Fingerprint reader is not connected',
        'method.fingerprint.reader_is_not_connected'),
    fingerReaderUnsupported: () => _k('Fingerprint reader not supported',
        'method.fingerprint.reader_not_supported'),
    fingerRemoveAfterScan: (fingers) => _('Lift ${fingers} off scanning device after each successful scan.',
        {fingers}),
    fingerRemoveConfirmation: () => _('Are you sure you wish to remove these fingerprints?'),
    fingerRemoveTitle: () => _('Remove fingerprint'),
    fingers: () => _('fingers'),
    fingerScan: () => _('scan'),
    fingerScanning: () => _('Scan in progress'),
    fingerScanningTitle: () => _('Scan Fingerprint'),
    fingerScans: () => _('scans'),
    fingerScansRequired: (numCapturesRequired) => _('${numCapturesRequired} ${pluralScans} required',
        {
            numCapturesRequired,
            pluralScans: (numCapturesRequired > 1) ? t.fingerScans() : t.fingerScan()
        }),
    fingerSelectDuress: () => _('Select to set as duress finger'),
    fingerSelected: () => _('selected finger'),
    fingerSelectRemove: () => _('Select to remove fingerprint'),
    fingerSelectScan: () => _('Select to scan finger'),
    fingerServiceError: () => _('Fingerprint service error'),
    fingerServiceUnavailable: () => _k('Fingerprint service is not available',
        'method.fingerprint.service_is_not_available'),
    fingersLeft: () => _('left fingers'),
    fingersMoreRequired: (numFingersRemaining) => _('${numFingersRemaining} more ${fingers} are required to enroll',
        {
            numFingersRemaining,
            fingers: (numFingersRemaining > 1) ? t.fingers() : t.finger()
        }),
    fingersMoreRequiredError: (minFingers) => _('A minimum of ${minFingers} different fingerprints are required. You must scan more fingers',
        {minFingers}),
    fingersRemoveConfirmation: () => _('Are you sure you wish to remove this fingerprint?'),
    fingersRight: () => _('right fingers'),
    fingersSelectRemove: () => _('Select to remove fingerprints'),
    fingersSelectScan: () => _('Select to scan fingers'),
    fingersThumbs: () => _('thumbs'),
    fingerTimeout: () => _('Scan Timeout'),
    fingerUseMultiReader: () => _('Use multi-finger reader for enrollment'),
    generating: () => _('Generating'),
    handLeft: () => _('Left Hand'),
    handRight: () => _('Right Hand'),
    hands: () => _('Hands'),
    help: () => _('Help'),
    hotpInstructions: (numHOTP) => _('Generate and specify ${numHOTP} consecutive HOTP values',
        {numHOTP}),
    hotpMethodDescription: (numHOTP) => _('The HMAC-based One-time Password (HOTP) method uses a counter that is in sync with your device and the server. Specify an OATH token serial number, usually provided by your system administrator. If the token counter is out of sync, synchronize it by specifying the ${numHOTP} HOTP values below.',
        {numHOTP}),
    hotpSecret: () => _('Secret (if you know)'),
    hotpSynchronize: () => _('Synchronize the token counter'),
    hotpValue: (id) => _('Value ${id}',
        {id}),
    hotpYubikeyId: () => _('YubiKey Token ID'),
    identityProvider: () => _('Identity provider'),
    identityProviderSelect: () => _('Select Identity provider'),
    language: () => _('Language'),
    languageSelect: () => _('Select Language'),
    ldapMethodDescription: () => _('The LDAP password is your corporate password. ${company} Advanced Authentication automatically enrolls your LDAP password.',
        {
            company: PRODUCT_COMPANY_NAME
        }),
    loading: () => _('Loading'),
    loginSessionExpired: () => _('Login session expired'),
    logonProcessExpiredError: () => _('Logon process expired!'),
    menu: () => _('Menu'),
    messageClose: () => _('Close Message'),
    mobilePhoneOverride: () => _('To override for this method, enter ${inputFieldName}',
        {
            inputFieldName: t.mobilePhoneOverrideLabel()
        }),
    mobilePhoneOverrideLabel: () => _('Override Mobile Phone'),
    mobilePhonePosessive: () => _('Your mobile phone'),
    networkCommunicationLost: () => _('Could not communicate with server. Refresh page if necessary.'),
    oathSerial: () => _('OATH Token Serial'),
    oathSerialNumber: () => _('OATH Token Serial Number'),
    oathToken: () => _('OATH Token'),
    oauth2MethodDescription: () => _('The Oauth2 method provides authentication via an external service.'),
    oneTimePassword: () => _('One-time Password (OTP)'),
    openClose: () => _('Open/Close'),
    otpExplanation: () => _('OTP methods are one-time password authenticators.'),
    passwordChange: () => _('Change Password'),
    passwordConfirmationLabel: () => _('Confirmation'),
    passwordLabel: () => _('Password'),
    passwordMethodDescription: () => _('The Password method is a password stored in ${company} Advanced Authentication not connected to your corporate directory. This can be a PIN or a simple password.',
        {
            company: PRODUCT_COMPANY_NAME
        }),
    passwordsNotMatching: () => _('Passwords do not match'),
    phoneOverride: () => _('To override for this method, enter ${inputFieldName}',
        {
            inputFieldName: t.phoneOverrideLabel()
        }),
    phoneOverrideLabel: () => _('Override Phone'),
    phonePosessive: () => _('Your phone'),
    pkiCertExpiration: (cert, date) => _('${cert} (Expiry date: ${date})',
        {cert, date}),
    pkiEnrollFailed: () => _('Cannot enroll due to errors'),
    pkiGenerateKeypair: () => _('Generate a key pair'),
    pkiGetCertificates: () => _('Get Certificates'),
    pkiInstructions: () => _('Use an existing certificate or generate a key pair'),
    pkiKey: () => _('Key'),
    pkiKeyNotFound: () => _('Key not found. It must be a wrong card'),
    pkiMethodDescription: () => _('The PKI Method authenticates using special key files known as certificates. The certificates are stored on a hardware device connected to your computer.'),
    pkiPin: () => _('Password or PIN'),
    pkiServiceError: () => _('PKI service error'),
    pkiServiceUnavailable: () => _('PKI service is not available'),
    pkiSpecifyPin: () => _k('Specify your PIN',
        'method.pki.enter_your_pin'),
    pkiWrongPin: () => _k('Incorrect PIN',
        'method.pki.wrong_pin'),
    productBuild: () => _('Build ${productBuild}',
        {
            productBuild: PRODUCT_BUILD_SHORT
        }),
    productGroup: () => _('Security product group'),
    productName: () => _('Advanced Authentication'),
    radiusMethodDescription: () => _('The Radius Client method forwards your authentication request to a Radius server.'),
    recipientUnknown: () => _('unknown'),
    secQuestAnswer: () => _('Answer'),
    secQuestMethodDescription: () => _('The Security Questions method allows the administrator to define questions and number required for authentication. Define unique answers for all the questions. Authenticate by answering the required number of security questions with your unique answers.'),
    secretLabel: () => _('Secret'),
    showHidePasswordLabel: () => _('Show/Hide Password or PIN'),
    signOut: () => _('Sign out'),
    smartphoneBackupMethodInfo: () => _('As a backup method, the AdvAuth mobile app provides an OTP code if internet connection is not available on your smartphone.'),
    smartphoneBackupMethodInstructions: () => _k('If your phone does not have a network connection, you can specify the offline OTP that is displayed in the smartphone app in the following field',
        'method.smartphone.offline_otp_description'),
    smartphoneEnrollInstructions: () => _('To enroll, get a QR code and scan it using the Advanced Authentication mobile app:'),
    smartphoneMethodDescription: () => _('The Smartphone method allows authentication with your smartphone. It is an out-of-band authentication. The ${company} Advanced Authentication application sends a push message to your smartphone, which you can accept or reject. Installing the ${appCompany} Advanced Authentication mobile app on your smartphone is required.',
        {
            appCompany: SMARTPHONE_APP_COMPANY_NAME,
            company: PRODUCT_COMPANY_NAME,
        }),
    smsOtpMethodDescription: () => _('The SMS One-time Password (OTP) method sends a text message to your mobile phone including an OTP. The OTP has to be used within a specified timeframe.'),
    swisscomMethodDescription: (phoneNumber) => _('The Swisscom Mobile ID method generates a request to your mobile phone. The mobile number where a request is sent is: ${phoneNumber}',
        {phoneNumber}),
    testMethodLabel: (methodName) => _('Test ${methodName} Method',
        {methodName}),
    testSuccessful: () => _('Test successful'),
    totpEnrollOptionsLabel: () => _('Enroll this method using one of the following:'),
    totpEnrollOptionsManual: () => _('Specify a Manual TOTP by adding Secret and Period values.'),
    totpEnrollOptionsSerial: () => _('In the OATH Token section, specify the OATH Token Serial Number, which is usually found on the back of the token. Generate and specify an OTP from the token.'),
    totpEnrollOptionsSmartphone: () => _('Click ${buttonName}, then scan the QR code using a smartphone app.',
        {
            buttonName: t.buttonGetQRCode()
        }),
    totpManual: () => _('Manual TOTP'),
    totpMethodDescription: () => _('The Time-based One-time Password (TOTP) method generates an OTP through a hardware OTP token or the ${company} Advanced Authentication mobile app. Once generated, the OTP must be used within a specified timeframe.',
        {
            company: SMARTPHONE_APP_COMPANY_NAME
        }),
    totpPeriod: () => _('Period'),
    totpUseBase32: () => _('Use Google Authenticator format (Base32)'),
    u2fAlreadyRegistered: () => _('This device is already registered'),
    u2fDetectDevice: () => _('Detect U2F Device'),
    u2fMethodDescription: () => _('The Universal 2nd Factor (U2F) method uses a YubiKey or similar device for authentication.'),
    u2fNotConnected: () => _('Token is not connected. Please connect a U2F token.'),
    u2fServiceError: () => _('FIDO U2F service error'),
    u2fServiceUnavailable: () => _k('Cannot reach the local FIDO U2F service. Contact your administrator to enable the service. You can use the Google Chrome browser, which has built-in support for U2F.',
        'method.u2f.cannot_reach_u2f_service'),
    u2fTimeout: () => _('Timeout. Press ${buttonName} to start again',
        {
            buttonName: t.u2fDetectDevice()
        }),
    u2fUnsupportedHTTP: () => _('FIDO U2F only supported using HTTPS'),
    u2fUnsupportedWrongPort: () => _('FIDO U2F service only supported on port 443, using HTTPS'),
    u2fWaitingFor: () => _k('Please touch the flashing U2F device now. You may be prompted to allow the site permission to access your security keys',
        'method.u2f.please_touch_device'),
    uiTitle: () => _('Advanced Auth Enrollment UI ${version}',
        {
            version: UI_VERSION
        }),
    unknownDevice: () => _('Unknown device'),
    unknownError: () => _('Unknown error'),
    unknownErrorCode: (code) => _('Unknown error code: ${code}',
        {code}),
    unsavedWorkWarning: () => _('Changes will be lost if you leave this page.'),
    unsavedWorkWarningTitle: () => _('Changes exist'),
    userLockedOut: () => _('User is locked out'),
    userNameOverride: () => _('To override for this method, enter ${inputFieldName}',
        {
            inputFieldName: t.userNameOverrideLabel()
        }),
    userNameOverrideLabel: () => _('Override User Name'),
    userNamePossessive: () => _('Your user name'),
    userSignOutSuccessful: () => _('Sign out successful'),
    verificationFailed: () => _('Verification Failed'),
    voiceMethodDescription: () => _('The Voice method initiates a call to your phone. Use the keypad on the phone to enter the PIN you have chosen, followed by the pound sign (#).'),
    voiceOTPMethodDescription: () => _('The Voice OTP method sends a One-time Password (OTP) through voice to your phone. Use the OTP to authenticate within a specified timeframe.'),
    voicePIN: () => _('PIN'),
    waitPlease: () => _('Please wait'),
    webAuthenticationInsecureConnection: () => _('This web page was not loaded in a secure context (https). Please try loading the page again using https or make sure you are using a browser with secure context support.'),
    webAuthenticationNotSupported: () => _('Web Authentication is not currently supported by this browser'),
    webAuthMethodDescription: () => _('The Web Authentication method works together with OAuth 2.0, OpenID Connect and SAML 2.0 authentication providers. It allows you to use your existing ID to enroll a new authenticator.'),
    webAuthUsernameHintLabel: () => _('Username or email'),
    webcamBusy: () => _('Webcam service is busy. Trying to reconnect'),
    webcamNotSupported: () => _('Webcam not supported by this browser'),
    windowsHelloServiceError: () => _('Windows Hello service is not available'),
    windowsHelloServiceUnavailable: () => _('Windows Hello service error'),
    winHelloAuthenticate: () => _k('Please authenticate with Windows Hello',
        'method.winhello.login_prompt'),
    winHelloMethodDescription: () => _('The Windows Hello method authenticates using the Windows Hello service. Your computer must use the Windows operating system to use this method.'),
    winHelloNoChallenge: () => _('No challenge provided from server.'),
    winHelloUserName: () => _('Windows User Name'),
    winHelloUsernameRequired: () => _('Please enter user name'),
};

export default t;
