/*******************************************************************************
 * 
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
 'use strict';

var createI18N = function() {
var i18n = {};

function LocalizationException(message) {
  this.name = 'LocalizationException';
  this.message= message;
}
LocalizationException.prototype = new Error();
LocalizationException.prototype.constructor = LocalizationException;

var vp = function(key, param, index) { 
    if (gromit.isInvalidL10NArgument(param) && !_.isNumber(param)) { 
        throw new LocalizationException('Missing required parameter number ' + index + ' for localization key: ' + key);
    }
};

i18n.getI18n_general_error_notfound=function(p0){vp('general_error_notfound', p0, 0);return 'There was a general error accessing the resource ' + p0 + '.  The server responded that the resource wasn\'t found.';};
i18n.invalid_client_time_behind='Your clock is behind';
i18n.invalid_client_time_ahead='Your clock is ahead';
i18n.getI18n_invalid_client_time_error=function(p0){vp('invalid_client_time_error', p0, 0);return 'Your computer\'s date and time (' + p0 + ') are incorrect.  Update your date and time to use Access Review.';};
i18n.getI18n_fatal_request_error=function(p0, p1, p2){vp('fatal_request_error', p0, 0);vp('fatal_request_error', p1, 1);vp('fatal_request_error', p2, 2);return 'There was an error calling the URL (' + p0 + ').  The server returned the status code ' + p1 + ' with the following data which was not parsable JSON data: ' + p2 + '';};
gromit.i18n = i18n;
return i18n;
};

createI18N();