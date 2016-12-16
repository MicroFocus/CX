(function () {
    "use strict";

    angular
        .module("app.dashboard")
        .config(configure);

    configure.$inject = ["$stateProvider", "dashboardProvider"];

    /**
     * @ngdoc parameters
     * @name app.dashboard.dashboardConfig
     * @memberof app.dashboard
     * @param {Object} $stateProvider
     * @param {Object} dashboardProvider
     * @requires {@Link app.dashboard.dashboardConfig.widgets}
     * @summary
     *  This is the configuration of the "dashboard" state.
     *  It it a dynamic view, with a dashboard ID passed in.
     *
     * @example
     * $state.go("dashboard");
     * $state.go("dashboard/B27F0520-86CF-1033-B9C8-005056A891F8");
     */
    function configure ($stateProvider, dashboardProvider) {
        $stateProvider.state({
            name: "dashboard",
            parent: "root",
            url: "/dashboard",
            data: {
                // Keeping the permissions here as an example, even though we do not have viewDashboard permission
                // We will definitely have editDashboard permission in future, so that state can define the permission
                // And controller can verify against logged in user permissions and show proper error message.
                permissions: ["default"],
                pageTitle: "Dashboard"
            },
            views: {
                "main.content@": {
                    templateUrl: "components/dashboard/dashboard.html",
                    controller: "DashboardController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                /**
                 * @ngdoc function
                 * @name app.dashboard.dashboardConfig.widgets
                 * @memberof app.dashboard.dashboardConfig
                 * @requires $http
                 * @requires $ocLazyLoad
                 * @requires logger
                 * @summary
                 *  This is the function that resolves any custom loaded widgets loaded via the Plugin Loader in D4.
                 *  This scans that directory and then injects those widget elements into our dashboard provider
                 *  via the config elements within that widget.
                 *  @todo I observed this being resolved and dynamic widgets being added everytime
                 *  Better to move this to service init, so that it happens only once per app load
                 */
                widgets: ["initRootState", "$http", "$ocLazyLoad", "logger", function (initRootState, $http, $ocLazyLoad, logger) {
                    $http.get("/dashboardplugins/widgetList.json").success(function (data) {
                        var widgetsToLoad = [];
                        angular.forEach(data.files, function (value, key) {
                            this.push(value);
                        }, widgetsToLoad);

                        $ocLazyLoad.load(widgetsToLoad).then(function () {
                            // logger.info("done loading dynamic modules");
                            return true;
                        });
                    });
                }]
            }
        });

        dashboardProvider.structure("6-6", {
            rows: [{
                columns: [{
                    styleClass: "col-md-6"
                }, {
                    styleClass: "col-md-6 no-gutter-left"
                }]
            }]
        }).structure("4-8", {
            rows: [{
                columns: [{
                    styleClass: "col-md-4",
                    widgets: []
                }, {
                    styleClass: "col-md-8",
                    widgets: []
                }]
            }]
        }).structure("12/4-4-4", {
            rows: [{
                columns: [{
                    styleClass: "col-md-12"
                }]
            }, {
                columns: [{
                    styleClass: "col-md-4"
                }, {
                    styleClass: "col-md-4"
                }, {
                    styleClass: "col-md-4"
                }]
            }]
        }).structure("12/6-6", {
            rows: [{
                columns: [{
                    styleClass: "col-md-12"
                }]
            }, {
                columns: [{
                    styleClass: "col-md-6"
                }, {
                    styleClass: "col-md-6"
                }]
            }]
        }).structure("12/6-6/12", {
            rows: [{
                columns: [{
                    styleClass: "col-md-12"
                }]
            }, {
                columns: [{
                    styleClass: "col-md-6"
                }, {
                    styleClass: "col-md-6"
                }]
            }, {
                columns: [{
                    styleClass: "col-md-12"
                }]
            }]
        }).structure("3-9 (12/6-6)", {
            rows: [{
                columns: [{
                    styleClass: "col-md-3"
                }, {
                    styleClass: "col-md-9",
                    rows: [{
                        columns: [{
                            styleClass: "col-md-12"
                        }]
                    }, {
                        columns: [{
                            styleClass: "col-md-6"
                        }, {
                            styleClass: "col-md-6"
                        }]
                    }]
                }]
            }]
        });
    }
})();
