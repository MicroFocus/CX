// Default adf widget example
(function (window, undefined) {
    "use strict";
    angular.module("test.testlist", ["adf.provider"])
        .config(["dashboardProvider", function (dashboardProvider) {
            dashboardProvider
                .widget("testlist", {
                    title: "Links Widget",
                    description: "Displays a test list of links",
                    templateUrl: "/sample/test/testlist/view.html",
                    edit: {
                        templateUrl: "/sample/test/testlist/edit.html",
                        controller: "testlistEditCtrl"
                    }
                });
        }])
        .controller("testlistEditCtrl", [
            "$scope",
            "$interval",
            "appConfig",
            "logger",
            function ($scope, $interval, appConfig, logger) {
                var promise = $interval(activate, appConfig.refresh);

                /**
                 * @ngdoc function
                 * @name activate
                 * @memberof app.widget.test.testWidgetController
                 * @requires {Function} logger
                 */
                function activate () {
                    logger.info("Test Widget activating.");
                }

                /**
                 * getLinks
                 *
                 * @returns {Array}
                 */
                function getLinks () {
                    if (!$scope.config.links) {
                        $scope.config.links = [];
                    }
                    return $scope.config.links;
                }

                /**
                 * addLink
                 */
                $scope.addLink = function () {
                    getLinks().push({});
                };

                /**
                 * removeLink
                 */
                $scope.removeLink = function (index) {
                    getLinks().splice(index, 1);
                };

                /**
                 * @name reloadWidgetData
                 * @summary
                 *  This is the hook we want all widgets to have; so we can globally refresh the data.
                 */
                $scope.$on("reloadWidgetData", function () {
                    // Call to function here to refresh data.
                    // logger.info("reloadWidgetData caught within Test Widget.  Activating.");
                    // activate();
                });

                /**
                 * @name dataDestroy
                 * @summary
                 *  We want to destroy the interval on destroying this widget scope.
                 */
                $scope.$on("$destroy", function () {
                    $interval.cancel(promise);
                });
            }
        ]);

})(window);
