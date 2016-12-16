(function () {
    "use strict";
    /**
     * Begins the auth.core.user Unit Test.
     *
     * @summary
     *  We will load the module "app.core.user", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $httpBackend
     * @requires $rootScope
     * @requires authService
     */
    describe("user service", function () {
        var $httpBackend;
        var userService;
        var $q;
        var deferred;
        var $rootScope;
        var mockResult = readJSON("mock_userService_getCurrentUser.json");
        var mockRole = readJSON("mock_userService_getCurrentRole.json");

        // Mocking up $resource
        beforeEach(function () {
            // Load the module to be tested.
            module("app.core.user");

            // As this is a service; we have some supporting services we need.
            inject(function (_$httpBackend_, _userService_, _$q_, _$rootScope_) {
                $httpBackend = _$httpBackend_;
                userService = _userService_;
                $q = _$q_;
                $rootScope = _$rootScope_;
            });

            // Spy on the authService call and return our mock results.
            spyOn(userService, "getCurrentUser").and.callFake(function () {
                return mockResult;
            });

            // Spy on the authService call and return our mock results.
            spyOn(userService, "getCurrentUserRole").and.callFake(function () {
                return mockRole;
            });
        });

        // Clear out any http calls that are in process.
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("can get an instance of my service", inject(function (userService) {
            expect(userService).toBeDefined();
        }));

        it("should get and return the current user", inject(function (userService) {
            var testUser;
            userService.user = null;
            testUser = userService.getCurrentUser();
            expect(testUser).toEqual(mockResult);
        }));

        it("should get and return the current user role", inject(function (userService) {
            var testUserRole;
            userService.role = null;
            testUserRole = userService.getCurrentUserRole();
            expect(testUserRole).toEqual(mockRole);
        }));

        it("should return the permissions of the user object", function () {
            var testPermissions;
            testPermissions = userService.getPermissions();
            expect(testPermissions).toEqual(mockResult.perms);
        });

        it("should test that I have various permission objects in my permission set", function () {
            var testCall;
            userService.user = mockResult;

            testCall = userService.hasPermission("runReports");
            expect(testCall).toBe(true);

            testCall = userService.hasPermission("someOddPermissionIdontHave");
            expect(testCall).toBe(false);
        });

    });
})();
