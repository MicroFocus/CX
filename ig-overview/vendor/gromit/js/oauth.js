/*******************************************************************************
 * 
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
 'use strict';

/*
 * The requests array holds onto requests which are pending while the login
 * process completes.
 */
gromit.reqs = [];

/*
 * The token and the token type are populated once the login process is complete
 */
gromit.token = null;
gromit.tokenType = null;

/**
 * @private
 * 
 * This function prepares a request by adding it to the request queue or making
 * the request directly.
 */
gromit.doRequest = function(/*Object*/ req) {
    if (gromit.reqs.length > 0) {
        /*
         * This means we are already in the process of logging in.  We don't want to
         * fire off this request just to start the login process all over again.  We
         * just want to hold onto this request until we can replay it.
         */
        gromit.reqs.push(req);
    } else {
        gromit.request(req);
    }
};

/**
 * @private
 *
 * This function does the actual request to the server based on the request object
 * with configured parameters.
 */
gromit.request = function(/*Object*/ req) {
    if (gromit.token) {
        req.headers.Authorization = gromit.tokenType + ' ' + gromit.token;
    }

    if (!req.errorCallback) {
        /*
         * If there's no error callback then we want to handle errors in the generic way
         */
        req.errorCallback = function(code, subcode, reason) {
            gromit.println('errorCallback(' + code + ', ' + subcode + ', ' + reason + ')');
            if (subcode === 'NotFound') {
                gromit.showFatalError(gromit.i18n.getI18n_general_error_notfound(req.url));
            } else {
                gromit.showGeneralError(code, subcode, reason);
            }
        };
    }

    if (!_.isFunction(req.http)) {
        throw 'The http object in the request was not a function.  This normally happens when you haven\'t ' +
        'declared $http in the definition of your controller.';
    }

    var responsePromise = req.http(req);

    responsePromise.success(function(data, status, headers, config) {
        if (req.successCallback) {
            req.successCallback(data, status, headers, config);
        }
    });

    var validateTime = function() {
        if (!$.cookie('ar-time')) {
            /*
             * This means we aren't supporting cookies and this check won't work
             */
            return true;
        }

        /*
         * There are some very strange bugs, especially on IE, when the client time gets very far off
         * from the server time.  It can also cause issues with SSL certificates.  This code checks to
         * see if the server time and the client time are more than one week different.  If they are
         * then we will show an error and the user won't be able to access the application.
         */
        var serverTime = parseInt($.cookie('ar-time'), 10);
        var clientTime = new Date().getTime();

        if (Math.abs(clientTime - serverTime) < 604800000) {
            return true;
        }

        setTimeout(function() {
            $('div.pageloading').hide();
            $('div.invalidTime').show();
    
            if (clientTime > serverTime) {
                $('div.invalidTime').children('h1').text(gromit.i18n.invalid_client_time_ahead);
            } else {
                $('div.invalidTime').children('h1').text(gromit.i18n.invalid_client_time_behind);
            }
    
            $('div.invalidTime').children('p').text(gromit.i18n.getI18n_invalid_client_time_error(gromit.fullDateTimeFormat(clientTime)));
        }, 3000);
        
        return false;
        

    };

    var handle401 = function(req) {
        if (!validateTime()) {
            gromit.println('the time was not valid');
            return;
        }
        
        /*
         * This means they haven't logged in yet and we need to add this request to the
         * request stack and prompt them to log in
         */
        gromit.token = null;
        gromit.tokenType = null;
        gromit.reqs.push(req);
        if (gromit.reqs.length === 1) {
            gromit.doLogin(req);
        }
    };

    responsePromise.error(function(data, status, headers, config) {
        if (status === 0) {
            /*
             * This means we weren't able to contact the server at all
             */
            gromit.showFatalError('Unable to contact server at ' + req.url);
        } else if (data && data.Fault) {
            /*
             * This means the server returned a RESTException
             */
            if (status === 401 &&
                (data.Fault.Code.Subcode.Value === 'NoCredentials' ||
                    data.Fault.Code.Subcode.Value === 'Expired')) {
                handle401(req);
            } else if (req.errorCallback) {
                /*
                 * This means it was just a normal RESTException and we want to pass it back
                 * to the calling code.
                 */
                req.errorCallback(data.Fault.Code.Value, data.Fault.Code.Subcode.Value, data.Fault.Reason.Text);
            }
        } else {
            /*
             * This means we got a response from the server which didn't have JSON data
             */
            if (status === 404) {
                /*
                 * If the item wasn't found then we want to send that to the calling code
                 */
                req.errorCallback('Sender', 'NotFound', '');
            } else if (status === 401) {
                handle401(req);
            } else if (req.unknownErrorCallback) {
                /*
                 * This means they gave us a special handler for generic exceptions
                 */
                req.unknownErrorCallback(data, status, headers);
            } else {
                if (data) {
                    gromit.showFatalError(gromit.i18n.getI18n_fatal_request_error(req.url, status, data));
                } else {
                    gromit.showFatalError(gromit.i18n.getI18n_fatal_request_error(req.url, status, ''));
                }
                if (window.console) {
                    console.error(gromit.showFatalError(gromit.i18n.getI18n_fatal_request_error(req.url, status, data)));
                }
            }
        }
    });
    
    return responsePromise;
};

/**
 * Get the current authentication token
 */
gromit.getAuthToken = function() {
    return gromit.tokenType + ' ' + gromit.token;
};

/**
 * @private
 */
gromit.requestPromise = function(/*Object*/ req) {
    return gromit.request(req);
};

/**
 * @private
 *
 * This function kicks off the actual login process which shows the iFrame and
 * redirects to the OAuth page.
 */
gromit.doLogin = function(/*Object*/ req) {
    if (gromit.isEmpty(gromit.AuthUrl)) {
        throw 'Unable to log in without gromit.AuthUrl';
    }
    
    gromit.oAuthAuthenticate(gromit.AuthUrl, function(/*String*/ token, /*String*/ type) {
        gromit.token = token;
        $.cookie('gromitTokenCookie', token, { path: '/' });

        gromit.tokenType = type;
        $.cookie('gromitTokenTypeCookie', type, { path: '/' });

        /*
         * Now we want to replay all of the existing requests which have come in while
         * we're trying to log in.
         */
        var reqs = gromit.reqs.slice(0);
        gromit.reqs = [];

        while (reqs.length > 0) {
            gromit.request(reqs.pop());
        }
    }, req.isBackground);
};

/**
 * Logout by going to the logout url and removing cookies that were set in doLogin
 */
gromit.doLogout = function() {
    var redirectTo = window.location.protocol + '//' + window.location.host + window.location.pathname;
    $.cookie('gromitTokenCookie', null, { path: '/' });
    $.cookie('gromitTokenTypeCookie', null, { path: '/' });
    
    if (gromit.isEmpty(gromit.AuthLogoutUrl)) {
        throw 'Unable to log out without gromit.AuthLogoutUrl';
    }

    window.location.assign(gromit.AuthLogoutUrl + '?target=' + redirectTo);
};

/**
 * This method is a little tricky.  It needs to get the current URL of the application
 * so we can build the right location to the oauth.html file for OAuth redirection.  To
 * do that we combine the current protocol, host, and path with the relative URL for the
 * nocache.js file so we can get the right location of where GWT will put the oauth.html
 * file instead of where the GWT application front page is loaded from.
 */
gromit.getCurrentUrl = function() {
    var url = window.location.protocol + '//' + window.location.host + window.location.pathname;

    if (window.location.pathname.length > 0 && url.substring(url.length - 1) !== '/') {
        /*
         * Then the URL ends with something like index.html.
         */
        url = url.substring(0, url.lastIndexOf('/') + 1);
    }

    if (url.substring(url.length - 1) !== '/') {
        url += '/';
    }

    return url;
};

/**
 * @private
 * 
 * This function does the actual redirection and creation of the iFrame for the OAuth
 * login function.  It also creates the URL and manages the parameters that we need to 
 * pass to the OAuth server.
 */
gromit.oAuthAuthenticate = function(/*String*/ url, /*function*/ callback, /*boolean*/ isBackground) {
    window.addEventListener('message', gromit.oAuthAuthenticateCompleteEventListener, false);

    gromit.oauthCallback = callback;
    
    if (gromit.isEmpty(gromit.ClientId)) {
        throw 'Unable to log in without client ID';
    }

    url += '?response_type=token';
    url += '&redirect_uri=' + gromit.getCurrentUrl() + 'oauth.html';
    url += '&client_id=' + gromit.ClientId;

    if (isBackground) {
        url += '&bgr=true';
    }

    gromit.oauthstate = 'gromitstate' + Math.random();
    url += '&state=' + gromit.oauthstate;

    var frame = $('<iframe id="gromitoauthframe" seamless="true" src="' + url + '"></iframe>');
    frame.css({
        'position': 'fixed',
        'left': '0px',
        'top': '0px',
        'z-index': '99999',
        'width': '100%',
        'height': '100%'
    });

    if (navigator.userAgent.match(/iPhone/i)) {
        /*
         * We show the OAuth login dialog with an iFrame and we use
         * fixed positioning so the frame stays over the main screen.
         * This works well almost everywhere, but iPhone doesn't allow
         * you to scroll fixed position items so we use absolute
         * positioning on iPhone.  
         */
        frame.css('position', 'absolute');
    }

    $('body').append(frame);
};

/**
 * @private
 *
 * This function is the callback which gets called when the OAuth login has completed and
 * the OAuth server redirects back to our page.  In this case the iFrame will show the oauth.html
 * file and that will call back to the parent frame running this function.  When this function
 * completes it calls to the oAuthAuthenticateComplete function.
 */
gromit.oAuthAuthenticateCompleteEventListener = function(event) {
    window.removeEventListener('message', gromit.oAuthAuthenticateCompleteEventListener, false);
    gromit.oAuthAuthenticateComplete(event.data);
};

/**
 * @private
 *
 * This function handles completion of the OAuth authentication process.  It takes the response
 * from the OAuth server, parses that response, and makes all of the values available for future requests.
 */
gromit.oAuthAuthenticateComplete = function(/*String*/ response) {
    var callback = gromit.oauthCallback;
    gromit.oauthCallback = null;

    $('#gromitoauthframe').remove();

    // First, parse the query string
    var params = {};
    var queryString = response.substring(1);
    var regex = /([^&=]+)=([^&]*)/g;
    var m = regex.exec(queryString);
    while (m) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        m = regex.exec(queryString);
    }

    if (gromit.oauthstate !== params.state) {
        gromit.oauthstate = null;
        throw ('The client side state (' + gromit.oauthstate + ') did not match the server-side state (' + params.state + ')');
    } else {
        gromit.oauthstate = null;
        gromit.fireLoginEvent();
        callback(params.access_token, params.token_type);
    }
};

/**
 * @private
 * 
 * This function gets the root scope and fires the event to indicate that the login has completed.
 * We need this event so the UI can update if the user is prompted to log in when their session
 * expires and they log in as a different user.
 * 
 * Accessing the root scope outside of the Angular application is generally a really bad thing to
 * do, but there's no better way to access it from here since this can't be a service since it
 * gets called back from the iFrame.
 *
 */
gromit.fireLoginEvent = function() {
    var $body = angular.element(document.body);
    var $rootScope = $body.scope().$root;
    $rootScope.$apply(function () {
        $rootScope.$broadcast('loginCompleted');
    });
};