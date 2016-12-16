(function (window, undefined) {
    "use strict";

    /**
     * The base angular module.  Here you name the module you are creating.  Any dependencies must be declared.
     *
     * @ngdoc module
     * @name testwidget.chart
     * @requires adf.provider - The Module that you will use to register the widget.
     * @requires nvd3 - A charting library for this widget.
     */
    angular.module("testwidget.chart", ["adf.provider", "nvd3"])
        .config(["dashboardProvider", function (dashboardProvider) {
            dashboardProvider
                .widget("testchart", {
                    title: "Test Chart Widget",
                    description: "Displays chart",
                    templateUrl: "/sample/test/chart/view.html",
                    controller: "chartCtrl",
                    edit: {
                        templateUrl: "/sample/test/chart/edit.html",
                        controller: "chartCtrl"
                    }
                });
        }])
        .controller("chartCtrl", ["$scope", function ($scope) {
            $scope.options = {
                chart: {
                    type: "discreteBarChart",
                    height: 250,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    duration: 1250,
                    showValues: false,
                    transitionDuration: 2500,
                    /**
                     * x function
                     *
                     * @param {Function} d
                     * @returns {*}
                     */
                    x: function (d) {
                        return d.label;
                    },
                    /**
                     * y function
                     *
                     * @param {Function} d
                     * @returns {*}
                     */
                    y: function (d) {
                        return d.value;
                    },
                    /**
                     * valueFormat
                     *
                     * @param {Function} d
                     * @returns {*}
                     */
                    valueFormat: function (d) {
                        return d3.format(",.4f")(d);
                    },
                    xAxis: {
                        axisLabel: "Priority"
                    },
                    yAxis: {
                        axisLabel: "Number of Alerts",
                        axisLabelDistance: 30
                    }
                }
            };
            $scope.data = [{
                key: "Cumulative Return",
                values: [
                    {label: "Urgent", value: 12},
                    {label: "High", value: 3},
                    {label: "Medium", value: 7},
                    {label: "Low", value: 25},
                    {label: "None", value: 8}
                ]
            }];
        }]);
    //jscs:disable
    angular.module("testwidget.chart").run(["$templateCache", function ($templateCache) {
        $templateCache.put("/sample/test/chart/edit.html", "<form role=form><div class=form-group><label for=chart>Chart Data</label> <input type=text class=form-control id=chart ng-model=config.chart placeholder=\"Chart Data\"></div></form>");
        $templateCache.put("/sample/test/chart/view.html", "<div><div><nvd3 options=\"options\" data=\"data\"></nvd3></div></div>");
    }]);
    //jscs:enable
})(window);
