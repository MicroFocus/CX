(function () {
    "use strict";

    /**
     * @ngdoc overview
     * @name app.widgets.faqs
     * @memberof app.widgets
     * @summary
     *
     * */

    angular
        .module("app.widgets.faqs")
        .controller("FaqsController", FaqsController);

    FaqsController.$inject = [
        "$scope",
        "$rootScope",
        "$interval",
        "logger",
        "config",
        "gettext",
        "appConfig"
    ];

    /**
     * @ngdoc controller
     * @name linksController
     * @memberof app.widgets.links
     * @summary
     *  The Links Module Controller
     * @requires $scope
     * @requires $rootScope
     * @requires $interval - used for data refreshing.
     * @requires {@Link app.core.logger}
     * @requires config - the widget Config object.
     * @requires gettext
     * @requires appConfig - the angular constants from config.json.  widget.config is something else.
     * @constructor
     */
    function FaqsController ($scope,
                             $rootScope,
                             $interval,
                             logger,
                             config,
                             gettext,
                             appConfig) {
        var vm = this;
        // This sets up the widget on a refresh schedule.
        var refreshInterval = 500000;
        var promise = $interval(function () {
            if ($rootScope.isEditMode !== true) {
                activate();
            }
        }, refreshInterval ? refreshInterval : appConfig.refresh);

        activate();

        /**
         * @ngdoc function
         * @name activate
         * @memberof app.widgets.links.linksController
         * @summary
         * activate function
         */
        function activate () {
            if (!config.content) {
                config.content = "";
            }
            $scope.config = config;

            logger.info("FAQs widget controller activated");
        }

    }
})();
