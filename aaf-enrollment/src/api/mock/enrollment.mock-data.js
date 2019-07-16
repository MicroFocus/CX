/* eslint camelcase: 0 */

export {expired as loginSessionExpired} from './login-session-info.mock-data';

const beginEnrollSuccessFn = (methodId) => ({
    enroll_process_id: 'enrollPid0' + methodId
});

const createUserTemplateSuccess = {
    auth_t_id: '131902ea3984337aa15cb6a91386102d'
};

const duplicateMethod = {
    data: {
        status: 'error',
        errors: [{
            location: 'server',
            name: 'category_id',
            msgid: 'AUCORE-3047',
            description: 'Method exists in the category'
        }]
    },
    status: 409
};

const invalidEnrollProcess = {
    data: {
        status: 'error',
        errors: [{
            location: 'server',
            name: 'AuError',
            msgid: 'AUCORE-1015',
            description: 'Enrollment process is not found gAUrOzw5YfLL8vrf7EZLFGGtjiUPSzOH'
        }]
    },
    status: 400
};

const doEnrollAlreadyDone = {
    status: 'FAILED',
    msg: 'Enrollment is already done',
    reason: '',
    msgid: 'AUCORE-1016'
};

const doEnrollIncorrect = {
    status: 'FAILED',
    msg: 'Answer length is less than 5 letters',
    reason: '',
    msgid: 'AUCORE-3029'
};

const doEnrollInvalidEnrollProcess = {
    status: 'FAILED',
    msg: 'Enrollment process is not found fRCdRSNaYQcm4dT9Etg9FpSDuYaDw7Pi',
    reason: 'PROCESS_NOT_FOUND_OR_EXPIRED',
    msgid: 'AUCORE-1015'
};

const doEnrollSecQuestions = {
    questions: {
        '6': 'What hue are your shoes?',
        '7': 'What hue is your car?',
        '8': 'What hue is red?',
        '9': 'What hue is blue?',
        '10': 'What hue is the sky?'
    },
    status: 'MORE_DATA',
    msg: 'Waiting for the answers...',
    reason: 'SECQUEST_WAITING_ANSWERS',
    method_id: 'SECQUEST:1',
    msgid: 'AUCORE-2046'
};

const doEnrollSuccess = {
    status: 'OK',
    msg: '',
    reason: '',
    method_id: 'PASSWORD:1'
};

const modifyEnrollTemplateDoesNotExist = {
    data: {
        status: 'error',
        errors: [{
            location: 'server',
            name: 'Internal Server Error',
            description: 'NoResultFound No row was found for one()'
        }]
    },
    status: 500
};

// Export data grouped by api endpoint
export const abortEnrollProcess = null;     // response is null whether succeeds or fails
export const beginEnrollProcess = {
    successFn: beginEnrollSuccessFn
};

export const createUserTemplate = {
    duplicateMethod,
    invalidEnrollProcess,
    success: createUserTemplateSuccess
};

export const deleteUserTemplate = null;     // response is null whether succeeds or fails

export const doEnroll = {
    alreadyDone: doEnrollAlreadyDone,
    incorrect: doEnrollIncorrect,
    invalidEnrollProcess: doEnrollInvalidEnrollProcess,
    securityQuestions: doEnrollSecQuestions,
    success: doEnrollSuccess
};

export const getWinHelloInfo = {
    account_name: 'aastin',
    is_ad_user: true
};

export const modifyUserTemplate = {
    templateDoesNotExist: modifyEnrollTemplateDoesNotExist,
    success: null
};
