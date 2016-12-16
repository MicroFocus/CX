(function () {
    "use strict";

    /**
     * Begins the main Unit Test.
     *
     * @summary
     *  We will load the module "app.core", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $scope
     * @requires logger
     */
    describe("LayoutController", function () {
        var $scope;
        var controller;
        var logger;
        var brandingService;
        var mockBrandingService = {
            /**
             * getProductName is the mock factory call; need to mock to return nulls, to test for if statements
             *
             * @returns "Sentinel"
             */
            getProductName: function () {
                return "Sentinel";
            },

            /**
             * getCompanyName is the mock factory call; need to mock to return nulls, to test for if statements
             *
             * @returns "Micro Focus"
             */
            getCompanyName: function () {
                return "Micro Focus";
            },

            /**
             * getSiteTitle is the mock factory call; need to mock to return nulls, to test for if statements
             *
             * @returns "Micro Focus Sentinel"
             */
            getSiteTitle: function () {
                return "Micro Focus Sentinel";
            }
        };

        beforeEach(module("app.layout"));

        beforeEach(inject(function ($controller, _$rootScope_, _logger_) {
            $scope = _$rootScope_.$new();

            controller = $controller("LayoutController", {
                $scope: $scope,
                logger: _logger_,
                brandingService: mockBrandingService
            });

            $scope.$digest();
        }));

        it("should have a LayoutController controller", function () {
            expect(controller).toBeDefined();
        });

        it("should have company name set", function () {
            expect(controller.title).toBe("Micro Focus");
        });
    });
})();
