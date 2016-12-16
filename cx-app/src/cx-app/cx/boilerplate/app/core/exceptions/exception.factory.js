(function () {
    "use strict";

    angular
        .module("app.core.exception")
        .factory("exception", exception);

    exception.$inject = ["logger"];

    /**
     * @ngdoc factory
     * @name app.core.exception.exceptionFactory
     * @memberof app.core.exception
     * @requires {@Link app.core.logger}
     * @returns {{catcher: catcher}}
     */
    function exception (logger) {
        var service = {
            catcher: catcher
        };
        return service;

        /**
         * @name app.core.exception.exceptionFactory.catcher
         * @summary
         *  Unsure as to purpose of this function
         * @memberof app.core.exception.exceptionFactory
         * @param {string} message
         * @returns {Function}
         */
        function catcher (message) {
            return function (reason) {
                logger.error(message, reason);
            };
        }
    }
})();
