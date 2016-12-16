(function () {
    "use strict";

    angular
        .module("app.layout")
        .controller("LayoutController", LayoutController);

    LayoutController.$inject = ["logger", "brandingService"];

    /**
     * @ngdoc controller
     * @name app.layout.controller
     * @memberof app.layout
     *
     * @requires {Function} logger
     * @constructor
     */
    function LayoutController (logger, brandingService) {
        var vm = this;
        vm.title = brandingService.getCompanyName();

        logger.info("LayoutController fired");
        activate();

        /**
         * activate function
         *
         * @memberof app.layout.controller
         * @returns Console output
         */
        function activate () {
            logger.info("Activated Layout");
        }
    }
})();

