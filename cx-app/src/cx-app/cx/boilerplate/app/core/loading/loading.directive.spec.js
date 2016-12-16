(function () {
    "use strict";

    /**
     * Begins the KnowledgeBase Unit Test.
     *
     * @summary
     *  We will load the module "app.knowledgebase", and inject the dependencies needs.
     *  As we are testing the factory we will not need any mocked dependencies.
     * @requires $scope
     * @requires controller
     */
    // the describe keyword is used to define a test suite (group of tests)
    describe("Loading directive", function () {
        // we declare some global vars to be used in the tests
        var elem;   // our directive jqLite element
        var directive;
        var scope;
        var rootScope;
        var dirScope;
        var controller;
        var template;

        // load the modules we want to test
        beforeEach(module("app.core.loading", "ngMockE2E"));

        // before each test, creates a new fresh scope
        // the inject function interest is to make use of the angularJS
        // dependency injection to get some other services in our test
        // here we need $rootScope to create a new scope
        beforeEach(inject(function ($rootScope, $compile, $templateCache, $controller) {
            scope = $rootScope.$new();
            rootScope = $rootScope.$new();

            spyOn(rootScope, "$on").and.callThrough();
        }));

        /**
         * function to compile a fresh directive with the given template, or a default one
         * compile the tpl with the $rootScope created above
         * wrap our directive inside a form to be able to test
         * that our form integration works well (via ngModelController)
         * our directive instance is then put in the global "elm" variable for further tests
         */
        function compileDirective (tpl) {
            if (!tpl) {
                tpl = angular.element("<div loading-state>" +
                    "<div class='page-loader'>" +
                        "<div class='progress-indicator indicator-embedded'>" +
                            "<div class='progress-indicator-spinner'></div>" +
                            "<div role='progressbar' translate class='progress-indicator-label'>Loading..</div>" +
                        "</div>" +
                    "</div>" +
                "</div>");
            }
            inject(function ($compile) {
                directive = $compile(tpl)(scope);
                elem = directive.find("div");
            });
            scope.$digest();

            // Grab controller instance
            controller = tpl.controller("loadingState");

            // Grab scope. Depends on type of scope.
            // See angular.element documentation.
            dirScope = tpl.isolateScope() || tpl.scope();
        }

        describe("initialisation", function () {
            // before each test in this block, generates a fresh directive
            beforeEach(function () {
                compileDirective();
            });

            // a single test example, check the produced DOM
            it("should produce a loading indicator", function () {
                expect(elem.find("div.progress-indicator-spinner").length).toEqual(1);
            });

            // a single test example, check the produced DOM
            it("should start and stop a loading indicator", function () {
                compileDirective();

                rootScope.$emit("$stateChangeStart");
                scope.$apply();
                expect(dirScope.loading.showLoader).toEqual(true);

                rootScope.$emit("$stateChangeSuccess");
                scope.$apply();
                expect(dirScope.loading.showLoader).not.toBeDefined();
            });
        });

    });
})();
