/* eslint camelcase: 0 */

export const fail = {
    data: {
        status: 'error',
        errors: [
            {
                location: 'server',
                name: 'AuError',
                msgid: 'AUCORE-1066',
                description: 'Login session is not found'
            }
        ]
    },
    status: 434
};

export const success = null;
