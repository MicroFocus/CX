(function () {
    "use strict";
    /**
     * Begins the auth.core.injectCss Unit Test.
     *
     * @summary
     *  We will load the module "app.core.injectCss", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $httpBackend
     * @requires $rootScope
     * @requires authService
     */
    describe("injectCss", function () {
        var $httpBackend;
        var $rootScope = {};
        var logger;

        beforeEach(module("app.core.injectCss"));

        // Mocking up $resource
        beforeEach(function () {
            inject(function ($injector) {
                $httpBackend = $injector.get("$httpBackend");
                $rootScope = $injector.get("$rootScope");
                logger = $injector.get("logger");
            });
            spyOn(window, "setTimeout");
        });

        it("can get an instance of my service", inject(function (injectCss) {
            expect(injectCss).toBeDefined();
        }));

        it("can create a link through the createLink service", inject(function (injectCss) {
            var testCall = injectCss.createLink("test", "_assets/css/test.css");
            var testElement = angular.element(testCall);
            var elemToMatch = "<link id=\"test\" rel=\"stylesheet\" type=\"text/css\" href=\"_assets/css/test.css\">";
            expect(testElement[0].outerHTML).toContain(elemToMatch);
        }));

        it("can create a link through the checkLoaded service", inject(function (injectCss) {
            var testCall = injectCss.checkLoaded("_assets/css/test.css");
            expect(setTimeout).toHaveBeenCalled();
        }));

        it("can create the Theme link", inject(function (injectCss) {
            var testCall = injectCss.createTheme();
            var testElement = angular.element(testCall);
            var elemToMatch = "<link id=\"theme\" rel=\"stylesheet\" type=\"text/css\" href=\"/styles/theme.css\">";
            expect(testElement[0].outerHTML).toContain(elemToMatch);
        }));

        it("can set the CSS link", inject(function (injectCss) {
            var sampleCss = "<link id=\"test\" rel=\"stylesheet\" type=\"text/css\" href=\"_assets/css/test.css\">";
            var sampleElement = angular.element(sampleCss);

            var testCall = injectCss.setCss("test", "_assets/css/test.css");
        }));

        it("can remove the CSS link", inject(function (injectCss) {
            var sampleCss = "<link id=\"test\" rel=\"stylesheet\" type=\"text/css\" href=\"_assets/css/test.css\">";
            var sampleElement = angular.element(sampleCss);

            var testCall = injectCss.removeCss("test", "_assets/css/test.css");
            expect(testCall).not.toBe(false);

            testCall = injectCss.removeCss("badtest", "_assets/css/badtest.css");
            expect(testCall).toBe(false);
        }));
    });
})();
