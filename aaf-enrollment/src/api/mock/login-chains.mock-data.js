/* eslint camelcase: 0 */

import {methodIds} from '../../data/MethodData';

export const fail = {
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

export const lockedOut = {
    user_is_locked: true
};

export const success = {
    chains: [
        {methods: [methodIds.PASSWORD], name: 'Password'},
        {methods: [methodIds.SECQUEST, methodIds.U2F], name: 'Internal'},
        {methods: [methodIds.RADIUS, methodIds.CARD], name: 'Remote'}
    ],
    user_is_locked: false
};
