(function () {
    "use strict";

    /**
     * @ngdoc overview
     * @name app.patterns
     * @memberof app.widgets
     * @summary
     *
     **/
    angular
        .module("app.patterns")
        .controller("demoController", PatternLibraryDemoController)
        .controller("demoModalInstanceController", ModalDemoController);

    PatternLibraryDemoController.$inject = [
        "$scope",
        "logger",
        "$uibModal",
        "growl",
        "$templateCache"
    ];
    ModalDemoController.$inject = [
        "$scope",
        "logger",
        "$modalInstance",
        "items"
    ];

    /**
     * @ngdoc controller
     * @name patternLibraryDemoController
     * @memberof app.patterns
     * @summary
     *  The Pattern Library Module Demo Controller
     * @requires $scope
     * @requires {@Link app.core.logger}
     * @requires config - the widget Config object.
     * @constructor
     */
    function PatternLibraryDemoController ($scope,
                                           logger,
                                           $uibModal,
                                           growl,
                                           $templateCache) {
        var vm = this;
        activate();
        // jscs:disable jsDoc
        function activate () {
            logger.info("Pattern Library Demo controller activated");
        }

        // -------------------------------------------
        // Alert Pattern
        // -------------------------------------------
        $scope.alerts = [
            {type: "danger", msg: "DANGER: Change a few things up and try submitting again."},
            {type: "info", msg: "INFO: This is an informational alert."},
            {type: "warning", msg: "WARNING: This is an informational alert."},
            {type: "success", msg: "SUCCESS: You successfully read this important alert message."}
        ];
        $scope.addAlert = function () {
            $scope.alerts.push({msg: "DEFAULT WARNING: Another alert!"});
        };
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        // Growl Function
        $scope.basicUsage = function (type, config) {
            switch (type) {
                case "success":
                    growl.success("<b>I'm</b> a success message and not unique", config);
                    break;
                case "info":
                    growl.info("I'm an info message", config);
                    break;
                case "warning":
                    growl.warning("I'm the warning message", config);
                    break;
                default:
                    growl.error("Ups, error message here!", config);
            }
        };

        // -------------------------------------------
        // Accordion Pattern
        // -------------------------------------------
        $scope.oneAtATime = true;
        $scope.groups = [
            {
                title: "Dynamic Group Header - 1",
                content: "Dynamic Group Body - 1"
            },
            {
                title: "Dynamic Group Header - 2",
                content: "Dynamic Group Body - 2"
            }
        ];

        $scope.items = ["Item 1", "Item 2", "Item 3"];

        /**
         * addItem
         */
        $scope.addItem = function () {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push("Item " + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        // -------------------------------------------
        // Grid Pattern
        // -------------------------------------------
        $scope.gridOptions = {
            columnDefs: [
                {name: "name"},
                {name: "gender", enableHiding: false},
                {name: "company"}
            ],
            enablePaginationControls: true,
            paginationPageSizes: [5, 10, 15],
            paginationPageSize: 5,
            data: [
                {
                    name: "Ethel Price",
                    gender: "female",
                    company: "Enersol"
                }, {
                    name: "Claudine Neal",
                    gender: "female",
                    company: "Sealoud"
                }, {
                    name: "Beryl Rice",
                    gender: "female",
                    company: "Velity"
                }, {
                    name: "Wilder Gonzales",
                    gender: "male",
                    company: "Geekko"
                }, {
                    name: "Georgina Schultz",
                    gender: "female",
                    company: "Suretech"
                }, {
                    name: "Carroll Buchanan",
                    gender: "male",
                    company: "Ecosys"
                }, {
                    name: "Valarie Atkinson",
                    gender: "female",
                    company: "Hopeli"
                }, {
                    name: "Schroeder Mathews",
                    gender: "male",
                    company: "Polarium"
                }, {
                    name: "Lynda Mendoza",
                    gender: "female",
                    company: "Dogspa"
                }, {
                    name: "Sarah Massey",
                    gender: "female",
                    company: "Bisba"
                }, {
                    name: "Robles Boyle",
                    gender: "male",
                    company: "Comtract"
                }
            ]
        };

        // -------------------------------------------
        // Modal Pattern
        // -------------------------------------------
        $scope.items = ["Item 1", "Item 2", "Item 3"];
        $scope.animationsEnabled = true;

        $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "demoModal",
                controller: "demoModalInstanceController",
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            logger.info("SCOPE OPEN", $scope.items);

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info("Modal dismissed at: " + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

        $templateCache.put("demoModal",
            "<div class='modal-header'>" +
            "<h3 class='modal-title'>I'm a modal!</h3>" +
            "</div>" +
            "<div class='modal-body'>" +
            "<ul>" +
            "<li ng-repeat='item in items'>" +
            "<a href='#' ng-click='$event.preventDefault(); selected.item = item'>{{ item }}</a>" +
            "</li>" +
            "</ul>" +
            "Selected: <b>{{ selected.item }}</b>" +
            "</div>" +
            "<div class='modal-footer'>" +
            "<button class='btn btn-primary' type='button' ng-click='ok()'>OK</button>" +
            "<button class='btn btn-warning' type='button' ng-click='cancel()'>Cancel</button>" +
            "</div>");
        // jscs:enable jsDoc
    }

    /**
     * @ngdoc function
     * @name modalDemoController
     * @memberof app.patterns
     */
    function ModalDemoController ($scope, logger, $uibModalInstance, items) {
        logger.info("MODAL: ITEMS2: ", items);
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        /**
         * Yes function for modal.
         */
        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        /**
         * No function for modal.
         */
        $scope.cancel = function () {
            $uibModalInstance.dismiss("cancel");
        };
    }
})();
