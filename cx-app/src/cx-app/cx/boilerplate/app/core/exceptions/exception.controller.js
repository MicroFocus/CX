(function() {
    "use strict";

    angular
        .module("app.core.exception")
        .controller("ExceptionController", ExceptionController);

    ExceptionController.$inject = ["logger", "$scope", "$stateParams", "gettextCatalog"];

    /**
     * @ngdoc controller
     * @name app.core.exception.exceptionController
     * @memberof app.core.exception
     * @summary
     *  The Controller for the Exception page  This is a page-level type of notification.
     *
     * @param {Function} logger
     * @param {Object} $scope
     * @param {Object} $stateParams
     * @param {Object} gettextCatalog
     *
     * @constructor
     */
    function ExceptionController (logger, $scope, $stateParams, gettextCatalog) {
        var vm = this;

        activate();

        /**
         * @ngdoc function
         * @name app.alerts.alertDetails.AlertDetailsController.activate
         * @memberof app.alerts.alertDetails.AlertDetailsController
         * @summary
         *  activate function - this loads the exception details from the $stateParams
         *
         * @property {string} vm.headerString - The Header; passed in via $stateParams
         * @property {string} vm.messageString - The Header; passed in via $stateParams
         */
        function activate () {
            logger.info("ExceptionController activated");

            // Mark the pageTitle defined in config.js as translatable string
            gettextCatalog.getString("Exception");
            vm.headerString = $stateParams.headerString;
            vm.messageString = $stateParams.messageString;
        }
    }
})();
