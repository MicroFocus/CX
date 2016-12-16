(function () {
    "use strict";

    angular
        .module("app.dashboard")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = [
        "$scope",
        "$rootScope",
        "logger",
        "$state",
        "$stateParams",
        "growl",
        "gettext",
        "appConfig",
        "$interval",
        "gettextCatalog",
        "confirmFactory"
    ];

    /**
     * @ngdoc controller
     * @name app.dashboard.dashboardController
     * @memberof app.dashboard
     * @summary
     *  The Controller for the Dashboard Module
     *
     * @property {number} refreshInterval - The configuration item set, in milliseconds, of how long to time the interval refresh.
     * @property {Function} promise - This is the $interval that will fire based on the refreshInterval variable.
     * @property {Object} vm.dashboard - the default Dashboard Object.
     *
     * @param {Function} $scope
     * @param {Function} $rootScope - Used to set a root variable - isEditMode for reload purposes.
     * @param {Function} logger - Custom $log wrapper
     * @param {Function} $state
     * @param {Function} $stateParams
     * @param {Function} growl
     * @param {Function} gettext
     * @param {Object} appConfig
     * @param {Function} $interval - $timeout wrapper used to broadcast a reload event.
     * @param {Function} gettextCatalog
     * @param {Function} confirmFactory
     *
     * @property {boolean} $rootScope.isEditMode - Boolean value set on various ADF events.  $interval will not fire if false.
     * @property {Object} vm.dashboard - the Master Dashboard Object.
     * @property {number} refreshInterval - The number from the brandingService.getRefreshInterval()
     * @property {Object} promise - The $interval that fires off based on the refreshInterval. Fires an event.
     *
     * @fires reloadWidgetData
     *
     * @requires brandingService
     * @requires $rootScope.isEditMode
     * @requires $interval
     *
     * @constructor
     */
    function DashboardController ($scope,
                                  $rootScope,
                                  logger,
                                  $state,
                                  $stateParams,
                                  growl,
                                  gettext,
                                  appConfig,
                                  $interval,
                                  gettextCatalog,
                                  confirmFactory) {
        var vm = this;
        // This gets the interval for the refresh; and sets it up. Will re-activate on the interval process.
        var refreshInterval = 50000;
        var promise = $interval(function () {
            if ($rootScope.isEditMode !== true) {
                $rootScope.$broadcast("reloadWidgetData");
            }
        }, refreshInterval ? refreshInterval : appConfig.refresh);

        vm.dashboard = {};
        vm.allowEdit = true;
        vm.dashboardError = false;

        activate();

        /**
         * @ngdoc function
         * @name activate
         * @memberof app.dashboard.dashboardController
         * @property {string} vm.dashboard.dashboardLastUpdated - Set to a new Data(); when the refresh button is clicked; this is displayed on main Dashboard Template.
         * @requires $stateParams.id
         * @requires dashboardService
         * @requires $state
         * @requires growl
         * @summary
         *  activate function - For the Dashboard Controller upon activation the following steps happen:
         *  1. The vm.dashboard.dashboardLastUpdated time is set to now.
         *  2. The {@Link app.dashboard.dashboardController.i18n} function is called.
         *  3. Call the {@Link app.dashboard.dashboardService} with the ID
         *  4. Upon successful return we redirect to the dashboard with the users custom dashboard.
         *  5. Upon a not-found return we create the default user dashboard; and redirect to that.
         */
        function activate () {
            logger.dev("DashboardController activated");
            //jscs:disable
            vm.dashboard = {
                title: "Sample 01",
                structure: "6-6",
                rows: [{
                    columns: [{
                        styleClass: "col-md-6",
                        widgets: [{
                            type: "linklist",
                            title: "Links",
                            titleTemplateUrl: "components/dashboard/adf-templates/widget-title.html",
                            isAllowed: true,
                            config: {
                                links: [{
                                    title: "SCM-Manager",
                                    href: "http://www.scm-manager.org"
                                }, {
                                    title: "Github",
                                    href: "https://github.com"
                                }, {
                                    title: "Bitbucket",
                                    href: "https://bitbucket.org"
                                }, {
                                    title: "Stackoverflow",
                                    href: "http://stackoverflow.com"
                                }]
                            },
                            wid: "1481228590101-3"
                        }],
                        cid: "1481228590081-1"
                    }, {
                        styleClass: "col-md-6",
                        widgets: [{
                            type: "FAQs",
                            config: {
                                faqs: [{
                                    heading: "ADF Widget Overview",
                                    src: "/components/widgets/faqs/docs/overview.md"
                                }, {
                                    heading: "ADF Widget API",
                                    src: "/components/widgets/faqs/docs/api.md"
                                }, {
                                    heading: "ADF Widget Config",
                                    src: "/components/widgets/faqs/docs/config.md"
                                }],
                                content: ""
                            },
                            title: "FAQs",
                            isAllowed: true,
                            titleTemplateUrl: "components/dashboard/adf-templates/widget-title.html",
                            wid: "1481228786412-5"
                        }],
                        cid: "1481228590082-2"
                    }]
                }],
                dashboardLastUpdated: "2016-12-08T20:26:29.729Z",
                titleTemplateUrl: "components/dashboard/adf-templates/dashboard-title.html"
            };
            //jscs:enable
            // Set the Last Modified Time.
            vm.dashboard.dashboardLastUpdated = new Date();
            i18n();
        }

        /**
         * @ngdoc function
         * @name i18n
         * @memberof app.dashboard.dashboardController
         * @summary
         *  Mark the pageTitle defined in config.js as translatable string, so that translated string appears in the title.
         *  Many of these strings are default options within the Dashboard Framework; and we want to ensure they're translated
         *
         * @requires gettext
         */
        function i18n () {
            gettext("Add new widget");
            gettext("Dashboard");
            gettext("Sample Dashboard");
            gettext("Edit Dashboard");
            gettext("Refresh");
            gettext("Operator Dashboard");
            gettext("Threat Response Dashboard");
            gettext("Title");
            gettext("Structure");
            gettext("Close");
            gettext("Cancel");
            gettext("Apply");
        }

        /**
         * @ngdoc event
         * @name $destroy
         * @memberof app.dashboard.dashboardController
         * @summary
         *  We want to destroy the interval on destroying this scope.
         */
        $scope.$on("$destroy", function () {
            $interval.cancel(promise);
        });

        /**
         * @ngdoc event
         * @name adfIsEditMode
         * @memberof app.dashboard.dashboardController
         * @requires $rootScope
         * @summary
         *  Set the $rootScope.isEditMode to true; entering Edit Mode.
         */
        $scope.$on("adfIsEditMode", function () {
            $rootScope.isEditMode = true;
        });

        /**
         * @ngdoc event
         * @name adfWidgetEnterEditMode
         * @memberof app.dashboard.dashboardController
         * @requires $rootScope
         * @summary
         *  Set the $rootScope.isEditMode to true; entering Edit Mode.
         */
        $scope.$on("adfWidgetEnterEditMode", function () {
            $rootScope.isEditMode = true;
        });

        /**
         * @ngdoc event
         * @name adfDashboardChanged
         * @memberof app.dashboard.dashboardController
         * @requires $rootScope
         * @summary
         *  Set the $rootScope.isEditMode to false; exiting Edit Mode.
         */
        $scope.$on("adfDashboardChanged", function () {
            $rootScope.isEditMode = false;
        });

        /**
         * @ngdoc event
         * @name adfDashboardEditsCancelled
         * @memberof app.dashboard.dashboardController
         * @requires $rootScope
         * @summary
         *  Set the $rootScope.isEditMode to false; exiting Edit Mode.
         */
        $scope.$on("adfDashboardEditsCancelled", function () {
            $rootScope.isEditMode = false;
        });

        /**
         * @ngdoc event
         * @name adfWidgetAdded
         * @memberof app.dashboard.dashboardController
         * @requires $rootScope
         * @summary
         *  Set the $rootScope.isEditMode to false; exiting Edit Mode.
         */
        $scope.$on("adfWidgetAdded", function () {
            $rootScope.isEditMode = false;
        });

        /**
         * @ngdoc event
         * @name reloadWidgetData
         * @memberof app.dashboard.dashboardController
         * @summary
         *  When the reload call is made update the Last Updated variable.
         */
        $scope.$on("reloadWidgetData", function () {
            vm.dashboard.dashboardLastUpdated = new Date();
        });
    }
})();
