(function () {
    "use strict";

    angular.module("app.core.interceptor")
        .factory("interceptFactory", interceptor);

    interceptor.$inject = ["$q", "logger", "$rootScope", "$injector"];

    /**
     * @ngdoc factory
     * @name interceptFactory
     * @memberof app.core.interceptor
     *
     * @param {Object} $q
     * @param {Object} logger
     * @param {Object} $rootScope
     * @param {Object} $injector
     * @returns {Function}
     */
    function interceptor ($q, logger, $rootScope, $injector) {
        var factory = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };
        // logger.dev("interceptFactory started");
        return factory;

        /**
         * @ngdoc function
         * @name request
         * @memberof app.core.interceptor.interceptFactory
         * @summary
         *  On request success
         *
         * @param {Object} config
         * @returns {*|Promise}
         */
        function request (config) {
            // Return the config or wrap it in a promise if blank.
            return config || $q.when(config);
        }

        /**
         * @ngdoc function
         * @name request
         * @memberof app.core.interceptor.interceptFactory
         * @summary
         *  On request failure
         *
         * @param {Object} rejection
         * @returns {Promise}
         */
        function requestError (rejection) {
            // Return the promise rejection.
            return $q.reject(rejection);
        }

        /**
         * @ngdoc function
         * @name request
         * @memberof app.core.interceptor.interceptFactory
         * @summary
         * On response success
         *
         * @param {Object} resp
         * @returns {*|Promise}
         */
        function response (resp) {
            // Return the response or promise.
            return resp || $q.when(resp);
        }

        /**
         * @ngdoc function
         * @name request
         * @memberof app.core.interceptor.interceptFactory
         * @summary
         * On response failure
         *
         * @param {Object} rejection
         */
        function responseError (rejection) {
            var state = $injector.get("$state");

            if (rejection.status !== 401) {
                //return rejection;
                return $q.reject(rejection);
            } else if (rejection.status === 401) {
                // Here is redirect to full login page.
                if (state.current.name !== "login") {
                    state.go("login", {}, {location: true, reload: true, notify: true});
                }
                return $q.reject(rejection);
            }
        }
    }
})();
