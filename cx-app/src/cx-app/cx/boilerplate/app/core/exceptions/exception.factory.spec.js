(function () {
    "use strict";

    /**
     * Begins the main Unit Test.
     *
     * @summary
     *  We will load the module "app.exception", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $httpBackend
     * @requires $rootScope
     * @requires exception
     * @requires loggerFactory
     * @requires $log
     */
    describe("exceptionFactory", function () {
        var $httpBackend;
        var $rootScope = {};
        var exception;
        var loggerFactory;
        var $log;

        beforeEach(function () {
            module("app.core.exception");
        });

        // Mocking up $resource
        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get("$httpBackend");
            $rootScope = $injector.get("$rootScope");
            $log = $injector.get("$log");
            loggerFactory = $injector.get("logger");
            exception = $injector.get("exception");
        }));

        it("can get an instance of my factory", inject(function (exception) {
            expect(exception).toBeDefined();
            expect(exception.catcher).toBeDefined();
        }));

        it("can throw an error", inject(function (exception) {
            expect(function () {
                exception("test");
            }).toThrow();
        }));
    });
})();
