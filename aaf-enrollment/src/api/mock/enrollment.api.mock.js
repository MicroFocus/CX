import {getAlternateApiResponseSetting, loginSessionMatchesStorage, simulateResponse} from './api.mock';
import mockData from './mock-data';

export function abortEnrollProcess(enrollProcessId, loginSessionId) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.enrollment.loginSessionExpired, true);
    }

    return simulateResponse(mockData.enrollment.abortEnrollProcess);
}

export function beginEnrollProcess(loginSessionId, methodId) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.enrollment.loginSessionExpired, true);
    }

    return simulateResponse(mockData.enrollment.beginEnrollProcess.successFn(methodId));
}

export function createUserTemplate(userId, loginSessionId, enrollProcessId, categoryId = '', comment) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.enrollment.loginSessionExpired, true);
    }

    const apiSetting = getAlternateApiResponseSetting();
    if (apiSetting.indexOf('invalidEnrollProcess') !== -1) {
        return simulateResponse(mockData.enrollment.createUserTemplate.invalidEnrollProcess, true);
    }
    else if (apiSetting.indexOf('duplicateMethod') !== -1) {
        return simulateResponse(mockData.enrollment.createUserTemplate.duplicateMethod, true);
    }

    return simulateResponse(mockData.enrollment.createUserTemplate.success);
}

export function deleteUserTemplate(userId, loginSessionId, templateId) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.enrollment.loginSessionExpired, true);
    }

    return simulateResponse(mockData.enrollment.deleteUserTemplate);
}

export function doEnroll(enrollProcessId, loginSessionId, enrollData, keepCamelCase, templateIdToModify) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.enrollment.loginSessionExpired, true);
    }

    const apiSetting = getAlternateApiResponseSetting();
    if (apiSetting.indexOf('doEnrollInvalidEnrollProcess') !== -1) {
        return simulateResponse(mockData.enrollment.doEnroll.invalidEnrollProcess);
    }
    else if (apiSetting.indexOf('doEnrollIncorrect') !== -1) {
        return simulateResponse(mockData.enrollment.doEnroll.incorrect);
    }
    else if (apiSetting.indexOf('doEnrollAlreadyDone') !== -1) {
        return simulateResponse(mockData.enrollment.doEnroll.alreadyDone);
    }

    const method = enrollProcessId.split('0')[1];
    if (method === 'SECQUEST:1' && enrollData === null) {
        return simulateResponse(mockData.enrollment.doEnroll.securityQuestions);
    }

    return simulateResponse(mockData.enrollment.doEnroll.success);
}

export function getDefaultRecipient(userId, loginSessionId, methodId) {
    return simulateResponse('default_recipient');
}

export function getTotpQrCode(isBase32Secret) {
    return simulateResponse(null);
}

export function getWinHelloInfo() {
    return simulateResponse(mockData.enrollment.getWinHelloInfo);
}

export function modifyUserTemplate(userId, loginSessionId, enrollProcessId, templateId, comment) {
    if (!loginSessionMatchesStorage(loginSessionId)) {
        return simulateResponse(mockData.enrollment.loginSessionExpired, true);
    }

    const apiSetting = getAlternateApiResponseSetting();
    if (apiSetting.indexOf('modifyEnrollTemplateDoesNotExist') !== -1) {
        return simulateResponse(mockData.enrollment.modifyUserTemplate.templateDoesNotExist, true);
    }

    return simulateResponse(null);
}
