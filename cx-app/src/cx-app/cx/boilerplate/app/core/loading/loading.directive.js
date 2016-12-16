(function () {
    "use strict";

    angular
        .module("app.core.loading")
        .directive("loadingState", loadingState);

    loadingState.$inject = ["$rootScope", "logger", "gettext"];

    /**
     * @ngdoc directive
     * @name loadingState
     * @memberof app.core.loading
     * @summary
     *  This directive contains the loading indicator that will show mostly during UI-Router resolves.
     *
     * @requires $rootScope
     * @requires app.core.logger
     * @requires gettext
     */
    function loadingState ($rootScope, logger, gettext) {
        var loadingStates = {};

        $rootScope.$on("$stateChangeStart", function (event, toState) {
            loadingStates.showLoader = true;
        });

        /**
         * Loop over the three stateChangeErrors to delete the loading state.
         *
         */
        ["$stateChangeSuccess", "$stateChangeError", "$stateNotFound"].forEach(function (eventType) {
            $rootScope.$on(eventType, function (event, toState) {
                delete loadingStates.showLoader;
            });
        });

        return {
            template: "<div ng-show='loading.showLoader' ng-transclude></div>",
            transclude: true,
            /**
             * The basic controller for the loader.
             *
             * @param {Object} $scope
             */
            controller: function ($scope) {
                $scope.loading = loadingStates;
            }
        };
    }
})();
