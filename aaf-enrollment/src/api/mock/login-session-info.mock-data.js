/* eslint camelcase: 0 */

export const expired = {
    data: {
        status: 'error',
        errors: [{
            location: 'server',
            name: 'AuError',
            msgid: 'AUCORE-1067',
            description: 'Login session expired'
        }]
    },
    status: 434
};

export const fail = {
    data: {
        status: 'error',
        errors: [{
            location: 'server',
            name: 'AuError',
            msgid: 'AUCORE-1066',
            description: 'Login session is not found'
        }]
    },
    status: 434
};

export const success = {
    event_name: 'Authenticators Management',
    data_id: 'AUTHENTICATORS MANAGEMENT',
    user_name: 'LOCAL\\ADMIN',
    user_id: '1a875ef039f47a5506c21977ad03ff59',
    repo_id: '1d3da1c2b51f11e8a3330242ac130003',
    repo_obj_id: '1d3f61ceb51f11e8a3330242ac130003',
    created: '2018-09-26T15:30:00.201926',
    chain_id: '1d279940b51f11e8a3330242ac130003',
    user_groups: []
};
