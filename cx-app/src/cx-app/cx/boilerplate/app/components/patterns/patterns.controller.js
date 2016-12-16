(function () {
    "use strict";

    /**
     * @ngdoc overview
     * @name app.patterns
     * @memberof app.widgets
     * @summary
     *
     * */

    angular
        .module("app.patterns")
        .controller("PatternsController", PatternsController);

    PatternsController.$inject = [
        "$scope",
        "$rootScope",
        "logger"
    ];

    /**
     * @ngdoc controller
     * @name PatternsController
     * @memberof app.patterns
     * @summary
     *  The Pattern Library Module Controller
     * @requires $scope
     * @requires $rootScope
     * @requires {@Link app.core.logger}
     * @constructor
     */
    function PatternsController ($scope,
                             $rootScope,
                             logger) {
        var vm = this;
        activate();

        /**
         * @ngdoc function
         * @name activate
         * @memberof app.patterns
         * @summary
         * activate function
         */
        function activate () {
            $scope.patterns = [
                {
                    name: "Design and Layout",
                    order: "",
                    slug: "design",
                    children: [
                        {
                            path: "/components/patterns/docs/colors.md",
                            name: "Colors",
                            order: "4",
                            slug: "colors",
                            layout: 1
                        }, {
                            path: "/components/patterns/docs/layouts.md",
                            name: "Layouts",
                            slug: "layouts",
                            layout: 2
                        }, {
                            path: "/components/patterns/docs/layouts-dashboard.md",
                            name: "Dashboard View",
                            slug: "layouts-dashboard",
                            layout: 2
                        }, {
                            path: "/components/patterns/docs/navigation.md",
                            name: "Navigation",
                            slug: "navigation",
                            layout: 2
                        }
                    ]
                }, {
                    name: "Angular Components",
                    order: "",
                    slug: "components",
                    children: [
                        {
                            path: "/components/patterns/docs/accordion.md",
                            name: "Accordion",
                            slug: "accordion",
                            layout: 2,
                            active: false
                        },
                        {
                            path: "/components/patterns/docs/alerts.md",
                            name: "Alerts",
                            slug: "alerts",
                            layout: 2
                        },
                        {
                            path: "/components/patterns/docs/dropdown.md",
                            name: "Dropdown Menus",
                            slug: "dropdown",
                            layout: 2
                        },
                        {
                            path: "/components/patterns/docs/grids.md",
                            name: "Grids",
                            slug: "grids",
                            layout: 2
                        },
                        {
                            path: "/components/patterns/docs/modals.md",
                            name: "Modals",
                            slug: "modals",
                            layout: 2
                        },
                        {
                            path: "/components/patterns/docs/popover.md",
                            name: "Popovers",
                            slug: "popover",
                            layout: 2
                        },
                        {
                            path: "/components/patterns/docs/tabs.md",
                            name: "Tabs",
                            slug: "tabs",
                            layout: 2
                        }, {
                            path: "/components/patterns/docs/panel-list.md",
                            name: "Panel List",
                            slug: "panellist",
                            layout: 2
                        }
                    ]
                }
            ];
        }

        /**
         * showTab
         */
        $scope.showTab = function (parent, index) {
            angular.forEach($scope.patterns, function (value, key) {
                logger.info("value: ", value);
                value.active = false;

                angular.forEach(value.children, function (childValue, childKey) {
                    childValue.active = false;
                });
            });

            $scope.patterns[parent].active = true;
            $scope.patterns[parent].children[index].active = true;
        };
    }
})();
