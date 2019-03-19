/* eslint camelcase: 0 */

export const abortLogonProcess = null;

export const beginLogonProcess = {
    logon_process_id: '9j4MYgkOUYYpIWEPZeoBYIz93QB0EpMA'
};

export const failLogon = {
    data: {
        status: 'error',
        errors: [{
            location: 'server',
            name: 'AuError',
            msgid: 'AUCORE-1056',
            description: 'User is not found'
        }],
        reason: 'USER_NOT_FOUND'
    },
    status: 400
};

export const incorrectPasswordLogon = {
    status: 'FAILED',
    msg: 'Incorrect password',
    linked_logon: false,
    reason: 'PASSWORD_WRONG',
    plugins: [],
    msgid: 'AUCORE-2007',
    chains: [{
        id_hex: '1d279940b51f11e8a3330242ac130003',
        tenant_id: 'def0def0def0def0def0def0def0def0',
        is_trusted: null,
        is_enabled: true,
        name: 'Password Only',
        short_name: '',
        methods: [
            'PASSWORD:1'
        ],
        position: 0,
        apply_for_ep_owner: false,
        image_name: 'PASSWORD_1.png',
        required_chain_id_hex: null,
        grace_period: null,
        mfa_tags: []
    }],
    current_method: 'PASSWORD:1',
    completed_methods: [],
    logon_process_id: '9j4MYgkOUYYpIWEPZeoBYIz93QB0EpMA',
    event_name: 'Authenticators Management',
    event_type: 'Generic',
    event_data_id: 'AUTHENTICATORS MANAGEMENT',
    data_id: 'AUTHENTICATORS MANAGEMENT',
    category_id: ''
};

export const loginProcessExpired = {
    data: {
        status: 'error',
        errors: [{
            location: 'server',
            name: 'AuError',
            msgid: 'AUCORE-1001',
            description: 'Logon process is not found'
        }]
    },
    status: 444
};

export const successLogon = {
    status: 'OK',
    msg: 'Welcome',
    linked_logon: false,
    plugins: [],
    login_session_id: 'VRmh9FusMD2Qs0yVYOfyX38HbJ4b7RKF',
    completed_chain: {
        id_hex: '1d279940b51f11e8a3330242ac130003',
        tenant_id: 'def0def0def0def0def0def0def0def0',
        is_trusted: null,
        is_enabled: true,
        name: 'Password Only',
        short_name: '',
        methods: [
            'PASSWORD:1'
        ],
        position: 0,
        apply_for_ep_owner: false,
        image_name: 'PASSWORD_1.png',
        required_chain_id_hex: null,
        grace_period: null,
        mfa_tags: []
    },
    user_id: '1a875ef039f47a5506c21977ad03ff59',
    user_name: 'LOCAL\\ADMIN',
    repo_id: '1d3da1c2b51f11e8a3330242ac130003',
    repo_obj_id: '1d3f61ceb51f11e8a3330242ac130003',
    msgid: 'AUCORE-2001',
    chains: [
        {
            id_hex: '1d279940b51f11e8a3330242ac130003',
            tenant_id: 'def0def0def0def0def0def0def0def0',
            is_trusted: null,
            is_enabled: true,
            name: 'Password Only',
            short_name: '',
            methods: [
                'PASSWORD:1'
            ],
            position: 0,
            apply_for_ep_owner: false,
            image_name: 'PASSWORD_1.png',
            required_chain_id_hex: null,
            grace_period: null,
            mfa_tags: []
        }
    ],
    current_method: 'PASSWORD:1',
    completed_methods: [
        'PASSWORD:1'
    ],
    logon_process_id: 'HViQBcpRWI8NZISguvFrYK9p4qGnWkZm',
    event_name: 'Authenticators Management',
    event_type: 'Generic',
    event_data_id: 'AUTHENTICATORS MANAGEMENT',
    data_id: 'AUTHENTICATORS MANAGEMENT',
    category_id: ''
};
