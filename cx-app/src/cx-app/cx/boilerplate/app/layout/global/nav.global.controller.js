(function () {
    "use strict";

    angular
        .module("app.layout.global")
        .controller("NavGlobalController", NavGlobalController);

    NavGlobalController.$inject = [
        "logger",
        "$scope",
        "$window",
        "$state",
        "gettext"
    ];

    /**
     * @ngdoc controller
     * @name app.layout.global.navGlobalController
     * @memberof app.layout.global
     *
     * @requires {@Link app.core.logger}
     * @requires {@Link app.core.auth.authService}
     * @requires {@Link app.core.branding.brandingService}
     * @requires {@Link app.core.localization.localizationService}
     * @constructor
     */
    function NavGlobalController (logger, $scope, $window, $state, gettext) {
        var vm = this;

        activate();

        /**
         * activate function
         *
         * @memberof app.layout.global.navGlobalController
         * @returns Console output
         */
        function activate () {
            vm.IsCollapsed = true;
            vm.username = "Boilerplate User";
        }
    }
})();
