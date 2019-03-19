/* eslint camelcase: 0 */

import {methodIds} from '../../data/MethodData';

export const categoriesEnabled = [
    {
        id_hex: '8d8ee',
        tenant_id: 'def0def0def0def0def0def0def0def0',
        is_trusted: null,
        is_enabled: true,
        name: 'On-site Login',
        short_name: '',
        methods: [methodIds.U2F, methodIds.PASSWORD],
        apply_for_ep_owner: false,
        image_name: 'PASSWORD_1.png',
        required_chain_id_hex: null,
        grace_period: null,
        mfa_tags: []
    },
    {
        id_hex: 'p19tc',
        tenant_id: 'def0def0def0def0def0def0def0def1',
        is_trusted: null,
        is_enabled: true,
        name: 'Remote Login (Desktop)',
        short_name: '',
        methods: [methodIds.CARD, methodIds.FINGER, methodIds.PASSWORD],
        apply_for_ep_owner: false,
        image_name: 'PASSWORD_1.png',
        required_chain_id_hex: null,
        grace_period: null,
        mfa_tags: []
    },
    {
        id_hex: 'mqo31',
        tenant_id: 'def0def0def0def0def0def0def0def2',
        is_trusted: null,
        is_enabled: true,
        name: 'Mobile Device Sign-in',
        short_name: '',
        methods: [methodIds.FACE, methodIds.RADIUS],
        apply_for_ep_owner: false,
        image_name: 'PASSWORD_1.png',
        required_chain_id_hex: null,
        grace_period: null,
        mfa_tags: []
    },
    {
        id_hex: 'z1lbn',
        tenant_id: 'def0def0def0def0def0def0def0def3',
        is_trusted: null,
        is_enabled: true,
        name: 'Administrator Login',
        short_name: '',
        methods: [methodIds.U2F, methodIds.VOICE_OTP, methodIds.HOTP],
        apply_for_ep_owner: false,
        image_name: 'PASSWORD_1.png',
        required_chain_id_hex: null,
        grace_period: null,
        mfa_tags: []
    }
];

export const noCategories = [
    {
        id_hex: 'p19tc',
        tenant_id: 'def0def0def0def0def0def0def0def0',
        is_trusted: null,
        is_enabled: true,
        name: 'On-site Login',
        short_name: '',
        methods: [methodIds.U2F, methodIds.PASSWORD],
        apply_for_ep_owner: false,
        image_name: 'PASSWORD_1.png',
        required_chain_id_hex: null,
        grace_period: null,
        mfa_tags: []
    },
    {
        id_hex: '8d8ee',
        tenant_id: 'def0def0def0def0def0def0def0def0',
        is_trusted: null,
        is_enabled: true,
        name: 'Everything else',
        short_name: '',
        methods: [ methodIds.BANKID, methodIds.BLUETOOTH, methodIds.CARD, methodIds.EMAIL_OTP,
            methodIds.EMERG_PASSWORD, methodIds.FACE, methodIds.FIDO2, methodIds.FINGER, methodIds.HOTP,
            methodIds.LDAP_PASSWORD, methodIds.OAUTH2, methodIds.PKI, methodIds.RADIUS, methodIds.SECQUEST,
            methodIds.SMARTPHONE, methodIds.SMS_OTP, methodIds.SWISSCOM, methodIds.TOTP, methodIds.VOICE,
            methodIds.VOICE_OTP, methodIds.WEBAUTH, methodIds.WINHELLO ],
        apply_for_ep_owner: false,
        image_name: 'PASSWORD_1.png',
        required_chain_id_hex: null,
        grace_period: null,
        mfa_tags: []
    }
];