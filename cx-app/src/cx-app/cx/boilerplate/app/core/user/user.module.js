(function () {
    "use strict";

    /**
     * @ngdoc module
     * @summary
     *  This module is a service that will query for the current user; store that information
     *  and return various chunks of information.  Primarily used now for permissions.
     * @name app.core.user
     * @memberof app
     */
    angular.module("app.core.user", ["app.core.logger"]);
})();
