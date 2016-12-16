(function () {
    "use strict";

    angular.module("app.core").config(configure);

    configure.$inject = ["$logProvider"];

    /**
     * @ngdoc module
     * @name app.core.config
     * @memberof app.core
     * @summary
     *  This is the module configuration for app.core
     *
     * @param {Object} $logProvider
     */
    function configure ($logProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

    }

})();
