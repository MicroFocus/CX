(function () {
    "use strict";

    /**
     * Begins the main Unit Test.
     * @summary
     *  We will load the module "app.core", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires configConstant
     * @requires $log
     * @requires $logProvider
     */
    beforeEach(module("app.core"));
    describe("the $logProvider", function () {
        var configConstant;
        var $log;
        var $logProvider;

        beforeEach(module(
            // Could combine with module('basics') definition in outer describe
            // but only need it here in this describe

            // This module definition function has access to any previously defined provider
            // which in this case is any provider defined in ng, ngMocks, or basics
            function (_$logProvider_) {
                $logProvider = _$logProvider_;
            }
        ));

        // inject triggers injector creation; module definition now "baked"
        beforeEach(inject(function (_$log_) {
            $log = _$log_;
        }));

        it("is accessible via the module function", function () {
            expect($logProvider).toBeDefined();
        });

        it("is not the same as the log service", function () {
            expect($logProvider).not.toEqual($log);
        });

        it("has same debugEnabled value as config2.debugMode", function () {
            expect($logProvider.debugEnabled()).toEqual(true);
        });
    });
})();
