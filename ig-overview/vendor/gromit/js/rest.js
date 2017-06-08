/*******************************************************************************
 * 
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
 'use strict';

/**
 * Get a specified JSON resource from the server.
 *
 * @param url the URL of the resource
 * @param http the Angular HTTP object to make the request with
 * @param successCallback the function that will be called back with the data
 * @param errorCallback the function that will be called back if the request fails
 * @param unknownErrorCallback the function that will be called back if the request fails
 */
gromit.get = function(/*String*/ url, /*Angular HTTP object*/ http, /*function*/ successCallback, /*function*/ errorCallback,
              /*function*/ unknownErrorCallback) {
    var req = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json'
        }
    };

    req.http = http;
    req.successCallback = successCallback;
    req.errorCallback = errorCallback;
    req.unknownErrorCallback = unknownErrorCallback;
    gromit.doRequest(req);

};

/**
 * Get a specified JSON resource from the server and indicate that this is a background request.  
 * That means this call will not extend the life of any sessions or security tokens.
 *
 * @param url the URL of the resource
 * @param http the Angular HTTP object to make the request with
 * @param successCallback the function that will be called back with the data
 * @param errorCallback the function that will be called back if the request fails
 * @param unknownErrorCallback the function that will be called back if the request fails
 */
gromit.getInBackground = function(/*String*/ url, /*Angular HTTP object*/ http, /*function*/ successCallback, 
                                  /*function*/ errorCallback, /*function*/ unknownErrorCallback) {
    var req = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json'
        }
    };

    req.http = http;
    req.successCallback = successCallback;
    req.errorCallback = errorCallback;
    req.unknownErrorCallback = unknownErrorCallback;
    req.isBackground = true;
    gromit.doRequest(req);

};

/**
 * Get a specified JSON resource as a promise from the server.
 * Used only for typeahead
 *
 * @param url the URL of the resource
 * @param http the Angular HTTP object to make the request with
 * @param errorCallback (optional)
 */
gromit.getPromise = function(/*String*/ url, /*Angular HTTP object*/ http, /*function*/ errorCallback) {
    var req = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json'
        }
    };

    req.http = http;
    req.errorCallback = errorCallback;
    return gromit.requestPromise(req);
};

/**
 * POST to GET a specified JSON resource as a promise from the server.
 * Used only for typeahead that require post for searchCriteria
 *
 * @param url the URL of the resource
 * @param http the Angular HTTP object to make the request with
 */
gromit.postPromise = function(/*String*/ url, /*Angular HTTP object*/ http, /*JSON*/ data) {
    var req = {
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data
    };

    req.http = http;
    return gromit.requestPromise(req);
};

/**
 * POST JSON data to the server
 *
 * @param url the URL of the resource
 * @param http the Angular HTTP object to make the request with
 * @param data the data to send to the server
 * @param successCallback the function that will be called back with the data
 * @param errorCallback the function that will be called back if the request fails
 * @param unknownErrorCallback the function that will be called back if the request fails
 */
gromit.post = function(/*String*/ url, /*Angular HTTP object*/ http, /*String*/ data, /*function*/ successCallback,
               /*function*/ errorCallback, /*function*/ unknownErrorCallback, /*Object*/ headers) {
    if (!headers) {
        headers = {};
    }
    
    gromit.postWithRequest({
        method: 'POST',
        url: url,
        headers: headers,
        data: data
    }, http, successCallback, errorCallback, unknownErrorCallback);
};

/**
 * @private
 */
gromit.postWithRequest = function(/*Object*/ req, /*Angular HTTP object*/ http, /*function*/ successCallback,
                                  /*function*/ errorCallback, /*function*/ unknownErrorCallback, /*Object*/ headers) {
    if (!req.headers['Content-Type']) {
        req.headers['Content-Type'] = 'application/json';
    }
    
    if (!req.headers.Accept) {
        req.headers.Accept = 'application/json';
    }

    req.http = http;
    req.successCallback = successCallback;
    req.errorCallback = errorCallback;
    req.unknownErrorCallback = unknownErrorCallback;

    gromit.doRequest(req);
};

/**
 * POST JSON data to the server
 *
 * @param url the URL of the resource
 * @param http the Angular HTTP object to make the request with
 * @param data the data to send to the server
 * @param successCallback the function that will be called back with the data
 * @param errorCallback the function that will be called back if the request fails
 * @param unknownErrorCallback the function that will be called back if the request fails
 */
gromit.postInBackground = function(/*String*/ url, /*Angular HTTP object*/ http, /*String*/ data, /*function*/ successCallback,
                                   /*function*/ errorCallback, /*function*/ unknownErrorCallback, /*Object*/ headers) {
    if (!headers) {
        headers = {};
    }
    
    gromit.postWithRequest({
        method: 'POST',
        url: url,
        headers: headers,
        data: data,
        isBackground: true
    }, http, successCallback, errorCallback, unknownErrorCallback);
};

/**
 * PUT JSON data to the server
 *
 * @param url the URL of the resource
 * @param http the Angular HTTP object to make the request with
 * @param data the data to send to the server
 * @param successCallback the function that will be called back with the data
 * @param errorCallback the function that will be called back if the request fails
 * @param unknownErrorCallback the function that will be called back if the request fails
 */
gromit.put = function(/*String*/ url, /*Angular HTTP object*/ http, /*String*/ data,
                   /*function*/ successCallback, /*function*/ errorCallback, /*function*/ unknownErrorCallback) {
    var req = {
        method: 'PUT',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: data
    };

    req.http = http;
    req.successCallback = successCallback;
    req.errorCallback = errorCallback;
    req.unknownErrorCallback = unknownErrorCallback;

    gromit.doRequest(req);

};

/**
 * Delete a specified resource form the server
 *
 * @param url the URL of the resource
 * @param http the Angular HTTP object to make the request with
 * @param successCallback the function that will be called back with the data
 * @param errorCallback the function that will be called back if the request fails
 * @param unknownErrorCallback the function that will be called back if the request fails
 */
gromit.del = function(/*String*/ url, /*Angular HTTP object*/ http, /*function*/ successCallback, /*function*/ errorCallback,
    /*function*/
    unknownErrorCallback) {
    var req = {
        method: 'DELETE',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {}
    };

    req.http = http;
    req.successCallback = successCallback;
    req.errorCallback = errorCallback;
    req.unknownErrorCallback = unknownErrorCallback;

    gromit.doRequest(req);

};
