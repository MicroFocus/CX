/* eslint camelcase: 0 */

export const badCalculation = {
    data: {
        status: 'error',
        errors: [
            {
                location: 'body',
                name: 'endpoint_secret_hash',
                description: 'String does not match expected pattern'
            }
        ]
    },
    status: 400
};

export const invalidSession = {
    data: {
        status: 'error',
        errors: [
            {
                location: 'server',
                name: 'AuError',
                msgid: 'AUCORE-1063',
                description: 'Endpoint session is not found'
            }
        ]
    },
    status: 433
};
