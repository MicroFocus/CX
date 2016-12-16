(function() {
    "use strict";

    angular
        .module("app.core.confirm")
        .controller("ConfirmationController", ConfirmationController);

    ConfirmationController.$inject = ["logger", "$scope", "$uibModalInstance", "data"];

    /**
     * @ngdoc controller
     * @name app.core.confirm.ConfirmationController
     * @memberof app.core.confirm
     * @summary
     *  The Controller for the Confirm Module
     *
     * @param {Function} logger
     * @param {Object} $scope
     * @param {Object} $uibModalInstance
     * @param {Object} data
     *
     * @constructor
     */
    function ConfirmationController (logger, $scope, $uibModalInstance, data) {
        var vm = this;

        activate();

        /**
         * activate function
         *
         * @memberof app.core.confirm.ConfirmationController
         */
        function activate () {
            $scope.data = angular.copy(data);
            logger.info("ConfirmationController activated", data);
        }

        /**
         * Ok closes the confirmation in a postive way.
         */
        $scope.ok = function (closeMessage) {
            $uibModalInstance.close(closeMessage);
        };

        /**
         * Cancel closes the confirmation in a negative way.
         */
        $scope.cancel = function (dismissMessage) {
            if (angular.isUndefined(dismissMessage)) {
                dismissMessage = "{{ 'Cancel' | translate }}";
            }
            $uibModalInstance.dismiss(dismissMessage);
        };
    }
})();
