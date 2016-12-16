(function () {
    "use strict";

    /**
     * Begins the main Unit Test.
     *
     * @summary
     *  We will load the module "app.landing", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $scope
     * @requires logger
     */
    describe("LandingController", function () {
        var $scope;
        var controller;
        var logger;
        var $state;

        beforeEach(module("app.landing"));

        beforeEach(inject(function ($controller, _$rootScope_, _logger_, _$state_) {
            $scope = _$rootScope_.$new();
            $state = _$state_;

            spyOn($state, "go");

            controller = $controller("LandingController", {
                $scope: $scope,
                logger: _logger_
            });

            $scope.$digest();
        }));

        it("should have a LandingController controller", function () {
            expect(controller).toBeDefined();
        });

        it("should transition to dashboards", inject(function ($state) {
            expect($state.go).toHaveBeenCalledWith("dashboard");
        }));
    });
})();
