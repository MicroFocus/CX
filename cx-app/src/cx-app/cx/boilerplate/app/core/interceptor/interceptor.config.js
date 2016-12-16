(function () {
    "use strict";

    angular.module("app.core.interceptor").config(configure);

    configure.$inject = ["$provide", "$httpProvider", "$stateProvider"];

    /**
     * @ngdoc config
     * @name interceptorConfig
     * @memberof app.core.interceptor
     * @summary
     *  This is the module configuration for app.core.user service
     *
     * @param {Object} $provide
     * @param {Object} $httpProvider
     * @param {Object} $stateProvider
     */
    function configure ($provide, $httpProvider, $stateProvider) {
        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push("interceptFactory");
    }
})();
