/* eslint camelcase: 0 */

export const categoriesEnabled = {
    chains: {
        '': [
            {
                id_hex: 'cb01',
                is_trusted: null,
                is_enabled: true,
                name: 'Password Only',
                short_name: 'Password',
                methods: [
                    { id: 'PASSWORD:1', is_enrolled: true }
                ]
            },
            {
                id_hex: 'cb02',
                is_trusted: null,
                is_enabled: true,
                name: 'Yubikey and Finger',
                short_name: '',
                methods: [
                    { id: 'U2F:1', is_enrolled: true },
                    { id: 'FINGER:1', is_enrolled: true }
                ]
            }
        ],
        '0001': [
            {
                id_hex: 'cb03',
                is_trusted: null,
                is_enabled: true,
                name: 'Emergency only',
                short_name: 'Emergency+',
                methods: [
                    { id: 'EMERG_PASSWORD:1', is_enrolled: false },
                    { id: 'PASSWORD:1', is_enrolled: true },
                    { id: 'OAUTH2:1', is_enrolled: false },
                    { id: 'FIDO2:1', is_enrolled: false }
                ]
            }
        ],
        '0002': [
            {
                id_hex: 'cb05',
                is_trusted: null,
                is_enabled: true,
                name: 'Yubikey',
                short_name: 'U2F',
                methods: [
                    { id: 'U2F:1', is_enrolled: false }
                ]
            }
        ],
        '0003': [
            {
                id_hex: 'cb03',
                is_trusted: null,
                is_enabled: true,
                name: 'Emergency only',
                short_name: 'Emergency+',
                methods: [
                    { id: 'EMERG_PASSWORD:1', is_enrolled: true },
                    { id: 'PASSWORD:1', is_enrolled: false },
                    { id: 'OAUTH2:1', is_enrolled: true },
                    { id: 'FIDO2:1', is_enrolled: false }
                ]
            },
            {
                id_hex: 'cb04',
                is_trusted: null,
                is_enabled: true,
                name: 'Remote',
                short_name: '',
                methods: [
                    { id: 'U2F:1', is_enrolled: true },
                    { id: 'TOTP:1', is_enrolled: false }
                ]
            }
        ]
    }
};

export const noCategories = {
    chains: {
        '': [
            {
                id_hex: 'ca01',
                is_trusted: null,
                is_enabled: true,
                name: 'On-site Login',
                short_name: '',
                methods: [
                    { id: 'U2F:1', is_enrolled: true },
                    { id: 'PASSWORD:1', is_enrolled: true }
                ]
            },
            {
                id_hex: 'ca02',
                is_trusted: null,
                is_enabled: true,
                name: 'Everything else',
                short_name: 'All',
                methods: [
                    { id: 'BANKID:1', is_enrolled: false },
                    { id: 'BLUETOOTH:1', is_enrolled: false },
                    { id: 'CARD:1', is_enrolled: true },
                    { id: 'EMAIL_OTP:1', is_enrolled: false },
                    { id: 'EMERG_PASSWORD:1', is_enrolled: false },
                    { id: 'FACE:1', is_enrolled: true },
                    { id: 'FIDO2:1', is_enrolled: false },
                    { id: 'FINGER:1', is_enrolled: true },
                    { id: 'HOTP:1', is_enrolled: false },
                    { id: 'LDAP_PASSWORD:1', is_enrolled: false },
                    { id: 'OAUTH2:1', is_enrolled: false },
                    { id: 'PKI:1', is_enrolled: false },
                    { id: 'RADIUS:1', is_enrolled: false },
                    { id: 'SECQUEST:1', is_enrolled: true },
                    { id: 'SMARTPHONE:1', is_enrolled: false },
                    { id: 'SMS_OTP:1', is_enrolled: false },
                    { id: 'SWISSCOM:1', is_enrolled: false },
                    { id: 'TOTP:1', is_enrolled: false },
                    { id: 'VOICE:1', is_enrolled: false },
                    { id: 'VOICE_OTP:1', is_enrolled: false },
                    { id: 'WEBAUTH:1', is_enrolled: false },
                    { id: 'WINHELLO:1', is_enrolled: false }
                ]
            }
        ]
    }
};
