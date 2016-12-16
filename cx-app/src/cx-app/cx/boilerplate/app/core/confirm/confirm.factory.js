(function () {
    "use strict";

    angular
        .module("app.core.confirm")
        .factory("confirmFactory", confirmFactory);

    confirmFactory.$inject = ["logger", "$uibModal", "gettextCatalog"];

    /**
     * @ngdoc factory
     * @name app.core.confirm.confirmFactory
     * @memberof app.core.confirm
     * @requires app.core.logger
     * @requires $uibModal
     * @requires gettextCatalog
     */
    function confirmFactory (logger, $uibModal, gettextCatalog) {
        var service = {
            openModal: openModal
        };

        return service;

        /**
         * @name openModal
         * @param {Object} data
         * @param {Object} settings
         * @fires $uibModal.open().result
         */
        function openModal (data, settings) {
            var defaults = {
                templateUrl: "core/confirm/confirm.html",
                transclude: true,
                controller: "ConfirmationController",
                defaultLabels: {
                    title: gettextCatalog.getString("Confirm?"),
                    ok: gettextCatalog.getString("OK"),
                    cancel: gettextCatalog.getString("Cancel")
                }
            };

            settings = angular.extend(defaults, (settings || {}));

            data = angular.extend({}, settings.defaultLabels, data || {});

            if ("templateUrl" in settings && "template" in settings) {
                delete settings.template;
            }

            settings.resolve = {
                /**
                 * this is the resolve object for the settings, to insert data
                 */
                data: function () {
                    return data;
                }
            };

            return $uibModal.open(settings).result;
        }
    }
}());
