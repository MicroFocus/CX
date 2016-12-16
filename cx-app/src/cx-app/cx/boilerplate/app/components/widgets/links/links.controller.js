(function () {
    "use strict";

    /**
     * @ngdoc overview
     * @name app.widgets.links
     * @memberof app
     * @summary
     *  The Alerts Module manages all system alerts, in terms of modals, badges, etc.
     * @requires {@Link app.widgets.links.controller}
     * */

    angular
        .module("app.widgets.links")
        .controller("LinksController", LinksController);

    LinksController.$inject = [
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
    function LinksController ($scope,
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
            getLinks();

            vm.alerts = [];

            gettext("Links");
            gettext("Sentinel Support");
            gettext("Displays a list of links");
        }

        /**
         * @ngdoc function
         * @name getLinks
         * @memberof app.widgets.links.linksController
         * @summary
         * getLinks
         *
         * @returns {Array|HTMLCollection}
         */
        function getLinks () {
            if (!$scope.config.links) {
                $scope.config.links = config.links;
            }
            return $scope.config.links;
        }

        /**
         * @ngdoc function
         * @name addLink
         * @memberof app.widgets.links.linksController
         * @summary
         * addLink Function
         *
         */
        $scope.addLink = function () {
            getLinks().push({});
        };

        /**
         * @ngdoc function
         * @name removeLink
         * @memberof app.widgets.links.linksController
         * @summary
         * removeLink
         *
         * @param {number} index
         */
        $scope.removeLink = function (index) {
            getLinks().splice(index, 1);
        };

        /**
         * @name reloadWidgetData
         * @memberof app.widgets.links.linksController
         * @summary
         *  This is the hook we want all widgets to have; so we can globally refresh the data.
         */
        $scope.$on("reloadWidgetData", function () {
            // Call to function here to refresh data.
            // logger.info("reloadWidgetData caught within Links Widget.  Activating.");
            activate();
        });

        /**
         * @ngdoc function
         * @name dataDestroy
         * @memberof app.widgets.links.linksController
         * @summary
         *  We want to destroy the interval on destroying this widget scope.
         */
        $scope.$on("$destroy", function () {
            $interval.cancel(promise);
        });
    }
})();
