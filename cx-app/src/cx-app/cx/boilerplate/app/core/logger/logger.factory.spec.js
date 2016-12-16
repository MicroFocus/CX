(function () {
    "use strict";

    /**
     * Begins the main Unit Test.
     *
     * @summary
     *  We will load the module "app.core.logger", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $log
     * @requires $rootScope
     * @requires loggerFactory
     */
    describe("logger", function () {
        var $log;
        var $rootScope = {};
        var loggerFactory;

        beforeEach(function () {
            module("app.core.logger");
        });

        // Mocking up $resource
        beforeEach(inject(function ($injector) {
            $rootScope = $injector.get("$rootScope");
            $log = $injector.get("$log");
            loggerFactory = $injector.get("logger");
        }));

        it("can get an instance of my loginService", inject(function (logger) {
            expect(loggerFactory).toBeDefined();
        }));

        it("can call logger.error", inject(function (logger) {
            loggerFactory.error("test");
            expect($log.error.logs[0]).toEqual(["Error: test", "", ""]);

            loggerFactory.error("test", "1");
            expect($log.error.logs[1]).toEqual(["Error: test", "1", ""]);

            loggerFactory.error("test", "1", "2");
            expect($log.error.logs[2]).toEqual(["Error: test", "1", "2"]);

            expect(function () {
                loggerFactory.error("test", "1", "2", "3");
            }).toThrow();

            // Clears the logs.
            $log.reset();
        }));

        it("can call logger.info", inject(function () {
            loggerFactory.info("test for info.");
            expect($log.info.logs[0]).toEqual(["Info: test for info.", "", ""]);

            loggerFactory.info("test for info.", "1");
            expect($log.info.logs[1]).toEqual(["Info: test for info.", "1", ""]);

            loggerFactory.info("test for info.", "1", "2");
            expect($log.info.logs[2]).toEqual(["Info: test for info.", "1", "2"]);

            expect(function () {
                loggerFactory.info("test", "1", "2", "3");
            }).toThrow();

            // Clears the logs.
            $log.reset();
        }));

        it("can call logger.success", inject(function () {
            loggerFactory.success("test for success.");
            expect($log.info.logs[0]).toEqual(["Success: test for success.", "", ""]);

            loggerFactory.success("test for success.", "1");
            expect($log.info.logs[1]).toEqual(["Success: test for success.", "1", ""]);

            loggerFactory.success("test for success.", "1", "2");
            expect($log.info.logs[2]).toEqual(["Success: test for success.", "1", "2"]);

            expect(function () {
                loggerFactory.success("test", "1", "2", "3");
            }).toThrow();

            // Clears the logs.
            $log.reset();
        }));

        it("can call logger.warning", inject(function () {
            loggerFactory.warning("test for warning.");
            expect($log.warn.logs[0]).toEqual(["Warning: test for warning.", "", ""]);

            loggerFactory.warning("test for warning.", "1");
            expect($log.warn.logs[1]).toEqual(["Warning: test for warning.", "1", ""]);

            loggerFactory.warning("test for warning.", "1", "2");
            expect($log.warn.logs[2]).toEqual(["Warning: test for warning.", "1", "2"]);

            expect(function () {
                loggerFactory.warning("test", "1", "2", "3");
            }).toThrow();

            // Clears the logs.
            $log.reset();
        }));
    });
})();
