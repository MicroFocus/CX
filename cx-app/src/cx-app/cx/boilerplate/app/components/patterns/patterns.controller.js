(function () {
    "use strict";

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
     * @name patternsController
     * @memberof app.patterns
     * @summary
     *  The Pattern Library Module Controller
     *
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
         * @memberof app.patterns.patternsController
         * @summary
         * activate function, defines the initial pattern object
         *
         */
        function activate () {
            /**
             * @ngdoc property
             * @name scope_patterns
             * @memberof app.patterns.patternsController.activate
             *
             * @property {Object} $scope.patterns
             * @property {string} $scope.patterns.name - The Top Level Grouping
             * @property {string} $scope.patterns.slug - The short, internal naming convention
             * @property {Object} $scope.patterns.children
             * @property {string} $scope.patterns.children.path - Path to the Markdown Document
             * @property {string} $scope.patterns.children.name - The display Title of the Pattern
             * @property {string} $scope.patterns.children.slug - Internal name of the pattern
             * @property {number} $scope.patterns.children.layout - 1 or 2 column layout.
             *
             */
            $scope.patterns = [
                {
                    name: "Design and Layout",
                    slug: "design",
                    children: [
                        {
                            path: "/components/patterns/docs/colors.md",
                            name: "Colors",
                            slug: "colors",
                            layout: 1
                        }, {
                            path: "/components/patterns/docs/layouts.md",
                            name: "Layouts",
                            slug: "layouts",
                            layout: 2
                        }, {
                            path: "/components/patterns/docs/layouts-page-group.md",
                            name: "Page Group View",
                            slug: "layouts-page-group",
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
                        }, {
                            path: "/components/patterns/docs/actions.md",
                            name: "Actions",
                            slug: "actions",
                            layout: 1
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
                            path: "/components/patterns/docs/buttons.md",
                            name: "Buttons",
                            slug: "buttons",
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
         * @ngdoc function
         * @name showTab
         * @memberof app.patterns.patternsController
         * @summary
         * Function to turn on/off tabs in the main content; and in the sidebar
         *
         * @description
         * Loops through each of the $scope.pattern items, and makes each view.active == false
         *
         * Then it will turn the active and first child tab on.
         *
         * @param {string} parent
         * @param {number} index
         *
         * @requires {@Link app.patterns.patternsController.activate.scope_patterns}
         */
        $scope.showTab = function (parent, index) {
            angular.forEach($scope.patterns, function (value, key) {
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
