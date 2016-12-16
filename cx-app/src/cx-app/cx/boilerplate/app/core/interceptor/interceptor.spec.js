(function () {
    "use strict";

    describe("Service Unit Tests", function () {

        var mockHttpProvider;
        var interceptFactory;
        var $httpBackend;
        var logger;
        var state;
        var $http;

        beforeEach(function () {
            module("app.core.interceptor", function ($httpProvider) {
                //save our interceptor
                mockHttpProvider = $httpProvider;
            });
        });

        beforeEach(function () {
            inject(function (_$httpBackend_, _$http_, _logger_, _interceptFactory_, _$state_) {
                $httpBackend = _$httpBackend_;
                // NOTE: (@jvorisek) the test passed with wrong $http dependency
                // $http = _logger_;
                $http = _$http_;
                logger = _logger_;
                interceptFactory = _interceptFactory_;
                state = _$state_;
            });
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe("interceptFactory Tests", function () {

            it("should have interceptFactory be defined", function () {
                expect(interceptFactory).toBeDefined();
                expect(interceptFactory.request).toBeDefined();
                expect(interceptFactory.requestError).toBeDefined();
                expect(interceptFactory.response).toBeDefined();
                expect(interceptFactory.responseError).toBeDefined();
            });

            describe("HTTP tests", function () {
                it("should have the interceptFactory as an interceptor", function () {
                    expect(mockHttpProvider.interceptors).toContain("interceptFactory");
                });
                it("should fire a request Error", function () {
                    $httpBackend.when("GET", "http://example.com", null, function (headers) {
                        expect(interceptFactory.requestError.toHaveBeenCalled());
                    }).respond(200, {name: "example"});
                });
                it("should fire a request Error - 401", inject(function ($http) {
                    var promise = $http.get("/main");
                    $httpBackend.when("GET", "/main").respond(302);
                    $httpBackend.flush();
                    // The Promise is what fires the response
                    promise.then(
                        function (data) {},
                        function (data) {},
                        function (data) {}
                    );
                }));

                it("should fire a response Success", inject(function ($window, $http) {
                    var promise = $http.get("/main");
                    $httpBackend.when("GET", "/main").respond(200);
                    $httpBackend.flush();
                    // The Promise is what fires the response
                    promise.then(
                        function (data) {},
                        function (data) {},
                        function (data) {}
                    );
                }));

                it("should fire a response Error - 401", inject(function ($window, $http) {
                    var promise = $http.get("/main");
                    spyOn(state, "go");
                    $httpBackend.when("GET", "/main").respond(401);
                    $httpBackend.flush();
                    // The Promise is what fires the response
                    promise.then(
                        function (data) {},
                        function (data) {},
                        function (data) {}
                    );
                    expect(state.go).toHaveBeenCalled();
                }));
            }); //Mocked HTTP Requests

        }); //RequestService tests

    });
})();
