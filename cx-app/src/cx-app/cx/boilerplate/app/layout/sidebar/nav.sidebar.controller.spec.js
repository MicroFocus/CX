(function () {
    "use strict";

    /**
     * Begins the main Unit Test.
     *
     * @summary
     *  We will load the module "app.layout.sidebar", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $scope
     * @requires logger
     */
    describe("NavSidebarController", function () {
        var $scope;
        var controller;
        var logger;
        var mockAuthService;
        var mockBrandingService;
        var mockResult;
        mockResult = {
            "auth-source": "DATABASE",
            createdate: "2015-11-23T16:04:35.983Z",
            creator: {},
            meta: {},
            moddate: "2015-11-23T16:04:35.983Z",
            modifier: {},
            name: "admin",
            perms: {},
            roles: ["Role1", "Role2"],
            state: "ACTIVE",
            status: 200,
            statusText: "OK",
            sys: false,
            "tenant-id": 1,
            "tenant-name": "default"
        };
        mockAuthService = {
            /**
             * mock returnUser
             *
             * @returns {{success: mockPromise.success, error: mockPromise.error, then: mockPromise.then}|*}
             */
            returnUser: function () {
                return mockResult;
            }
        };
        // Mock the branding service, we don't need to test that here.
        mockBrandingService = {
            /**
             * mockGetProductName
             *
             * @returns {string}
             */
            getProductName: function () {
                return "Sentinel";
            }
        };

        beforeEach(module("app.layout.sidebar"));

        beforeEach(inject(function ($controller, _$rootScope_, _logger_) {
            $scope = _$rootScope_.$new();

            controller = $controller("NavSidebarController", {
                $scope: $scope,
                logger: _logger_
            });

            $scope.$digest();
        }));

        it("should have a NavSidebarController controller", function () {
            expect(controller).toBeDefined();
        });

        it("should have an active function", function () {
            expect(controller.title).toBe("");
        });
    });
})();
