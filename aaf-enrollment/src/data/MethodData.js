export const methodIds = {
    BANKID: 'BANKID:1',
    BLUETOOTH: 'BLUETOOTH:1',
    CARD: 'CARD:1',
    DEVICE_AUTH: 'DEVICE_AUTH:1',
    EMAIL_OTP: 'EMAIL_OTP:1',
    EMERG_PASSWORD: 'EMERG_PASSWORD:1',
    FACE: 'FACE:1',
    FIDO2: 'FIDO2:1',
    FINGER: 'FINGER:1',
    HOTP: 'HOTP:1',
    LDAP_PASSWORD: 'LDAP_PASSWORD:1',
    OAUTH2: 'OAUTH2:1',
    PASSWORD: 'PASSWORD:1',
    PKI: 'PKI:1',
    RADIUS: 'RADIUS:1',
    SECQUEST: 'SECQUEST:1',
    SMARTPHONE: 'SMARTPHONE:1',
    SMS_OTP: 'SMS_OTP:1',
    SWISSCOM: 'SWISSCOM:1',
    TOTP: 'TOTP:1',
    U2F: 'U2F:1',
    VOICE: 'VOICE:1',
    VOICE_OTP: 'VOICE_OTP:1',
    WEBAUTH: 'WEBAUTH:1',
    WINHELLO: 'WINHELLO:1'
};

export const unenrollableMethods = [ methodIds.EMERG_PASSWORD, methodIds.OAUTH2];

export const autocreatedMethods = [ methodIds.EMAIL_OTP, methodIds.LDAP_PASSWORD, methodIds.RADIUS, methodIds.SMS_OTP,
    methodIds.SWISSCOM, methodIds.VOICE_OTP ];

// Store icons for the methods. Also store methodTitles, but this is not used in application except on login page
// temporarily until OSP replaces it. (This is why the titles aren't localized.)
export const methods = {
    [methodIds.BANKID]: { methodTitle: 'BankID', icon: 'bankid' },
    [methodIds.BLUETOOTH]: { methodTitle: 'Bluetooth', icon: 'bluetooth' },
    [methodIds.CARD]: { methodTitle: 'Card', icon: 'card_chip' },
    [methodIds.DEVICE_AUTH]: { methodTitle: 'Device Authentication', icon: 'device_monitor_thin' },
    [methodIds.EMAIL_OTP]: { methodTitle: 'Email OTP', icon: 'email_thin' },
    [methodIds.EMERG_PASSWORD]: { methodTitle: 'Emergency Password', icon: 'password_emergency' },
    [methodIds.FACE]: { methodTitle: 'Facial Recognition', icon: 'facial_recognition' },
    [methodIds.FIDO2]: { methodTitle: 'FIDO 2.0', icon: 'secure_web' },
    [methodIds.FINGER]: { methodTitle: 'Fingerprint', icon: 'fingerprint_thin' },
    [methodIds.HOTP]: { methodTitle: 'HOTP', icon: 'numeric_code' },
    [methodIds.LDAP_PASSWORD]: { methodTitle: 'LDAP Password', icon: 'password_ldap' },
    [methodIds.OAUTH2]: { methodTitle: 'Oauth2', icon: 'secure_identity' },
    [methodIds.PASSWORD]: { methodTitle: 'Password', icon: 'password_thin' },
    [methodIds.PKI]: { methodTitle: 'PKI', icon: 'pki_public_key' },
    [methodIds.RADIUS]: { methodTitle: 'Radius Client', icon: 'network' },
    [methodIds.SECQUEST]: { methodTitle: 'Security Questions', icon: 'security_questions' },
    [methodIds.SMARTPHONE]: { methodTitle: 'Smartphone', icon: 'phone_mobile_thick' },
    [methodIds.SMS_OTP]: { methodTitle: 'SMS OTP', icon: 'comment_thick' },
    [methodIds.SWISSCOM]: { methodTitle: 'Swisscom Mobile ID', icon: 'swisscom_mobile_id' },
    [methodIds.TOTP]: { methodTitle: 'Time-based OTP (TOTP)', icon: 'time_thick' },
    [methodIds.U2F]: { methodTitle: 'U2F', icon: 'usb' },
    [methodIds.VOICE]: { methodTitle: 'Voice', icon: 'phone_keypad' },
    [methodIds.VOICE_OTP]: { methodTitle: 'Voice OTP', icon: 'phone_thick' },
    [methodIds.WEBAUTH]: { methodTitle: 'Web Authentication', icon: 'world_thin' },
    [methodIds.WINHELLO]: { methodTitle: 'Windows Hello', icon: 'sys_windows ' }
};
