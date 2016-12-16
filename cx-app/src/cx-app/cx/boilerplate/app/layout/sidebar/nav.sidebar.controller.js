(function () {
    "use strict";

    angular
        .module("app.layout.sidebar")
        .controller("NavSidebarController", NavSidebarController);

    NavSidebarController.$inject = [
        "logger",
        "$rootScope",
        "$location",
        "$scope",
        "gettext",
        "config"
    ];

    /**
     * @ngdoc controller
     * @name app.layout.sidebar.navSidebarController
     * @memberof app.layout.sidebar
     *
     * @requires {@Link app.core.logger}
     * @requires $rootScope
     * @requires $location
     * @requires $scope
     * @requires gettext
     * @requires config
     * @constructor
     */
    function NavSidebarController (
        logger,
        $rootScope,
        $location,
        $scope,
        gettext,
        config) {
        var vm = this;

        activate();

        /**
         * @name vm.openPrimaryNav
         * @summary
         *  checks on sidebar status.
         * @memberof app.layout.sidebar.navSidebarController
         */
        vm.openPrimaryNav = function () {
            var expandClass = vm.isSidebarOpen ? "minified" : "expanded";
            vm.isSidebarOpen = !vm.isSidebarOpen;
            angular.element("#main-content").removeClass("expanded");
            angular.element("#main-content").removeClass("minified");
            angular.element("#main-content").addClass(expandClass);
            $rootScope.isSidebarOpen = vm.isSidebarOpen;
        };

        /**
         * @name vm.isActive
         * @memberof app.layout.sidebar.sidebarController
         * @param {string} viewLocation - incoming path to match.
         * @returns {boolean}
         */
        vm.isActive = function (viewLocation) {
            var pathMatch = $location.path().indexOf(viewLocation) > -1;
            return pathMatch;
        };

        /**
         *
         * @name activate
         * @summary
         *  activate function
         * @memberof app.layout.sidebar.navSidebarController
         */
        function activate () {
            var contextData = {vm: {}};

            var titleString = "Open {{ vm.productName }} Main";

            vm.title = "";

            // Create the URL by adding "sentinel" or "iRadar" onto the base URL.
            vm.oldUILink = "/" + config.application;
        }
    }
})();
