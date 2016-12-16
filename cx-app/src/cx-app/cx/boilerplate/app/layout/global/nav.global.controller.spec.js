(function () {
    "use strict";

    /**
     * Begins the main Unit Test.
     *
     * @summary
     *  We will load the module "app.layout.global", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $scope
     * @requires logger
     */
    describe("NavGlobalController", function () {
        var $scope;
        var controller;
        var logger;

        beforeEach(module("app.layout.global"));

        beforeEach(inject(function ($controller, _$rootScope_, _logger_) {
            $scope = _$rootScope_.$new();

            controller = $controller("NavGlobalController", {
                $scope: $scope,
                logger: _logger_
            });

            $scope.$digest();
        }));

        it("should have a NavGlobalController controller", function () {
            expect(controller).toBeDefined();
        });
    });
})();
