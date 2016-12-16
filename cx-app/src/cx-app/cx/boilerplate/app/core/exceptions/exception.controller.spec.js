(function () {
    "use strict";

    /**
     * Begins the main Unit Test.
     *
     * @summary
     *  We will load the module "app.disallowed", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $scope
     * @requires controller
     */
    describe("ExceptionController", function () {
        var $scope;
        var controller;
        var mockStateParams = {
            headerString: "Test Header",
            messageString: "Test Message"
        };

        beforeEach(module("app.core.exception"));

        beforeEach(inject(function ($controller, _$rootScope_, _gettextCatalog_) {
            $scope = _$rootScope_.$new();

            controller = $controller("ExceptionController", {
                $scope: $scope,
                gettextCatalog: _gettextCatalog_,
                $stateParams: mockStateParams
            });

            $scope.$digest();
        }));

        it("should have a ExceptionController controller", function () {
            expect(controller).toBeDefined();
        });
    });
})();
