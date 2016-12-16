(function () {
    "use strict";

    var config = {
        appTitle: "MAIN APP",
        locale: "en-US",
        highlightMissingTranlation: true
    };

    angular.module("app")
        .config(configure)
        .value("appConfig", config);

    intercept.$inject = ["$timeout", "$q", "$injector"];

    /**
     * Intercept Function
     *
     * @memberof app
     * @param {Object} $timeout
     * @param {Object} $q
     * @param {Object} $injector
     * @returns {{responseError: Function}}
     */
    function intercept ($timeout, $q, $injector) {
        var $http;
        var $state;

        // this trick must be done so that we don't receive
        // `Uncaught Error: [$injector:cdep] Circular dependency found`
        $timeout(function () {
            $http = $injector.get("$http");
            $state = $injector.get("$state");
        });

        return {
            /**
             * this is the response error being built; if it's not a 401
             *
             * @memberof app
             * @param {Object} rejection
             * @returns {*}
             */
            responseError: function (rejection) {
                var deferred = $q.defer();

                if (rejection.status !== 401) {
                    return rejection;
                }

                return deferred.promise;
            }
        };
    }

    configure.$inject = ["$stateProvider", "$urlRouterProvider", "$httpProvider", "markedProvider"];
    /**
     * This is the configuration of the States and Routes
     *
     * @param {Object} $stateProvider
     * @param {Object} $urlRouterProvider
     * @param {Object} $httpProvider
     * @param {Object} markedProvider
     */
    function configure ($stateProvider, $urlRouterProvider, $httpProvider, markedProvider) {

        $httpProvider.interceptors.push(intercept);

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get("$state");
            // No need to specify default options
            $state.go("root", {}, {reload: true});
        });
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            /**
             * set highlight options.
             */
            highlight: function (code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code, true).value;
                } else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });
        /**
         * Application States
         * @memberof app
         * @summary
         *  Defines the following routes
         *  - Home - Parent view of navigation wrapper; with subview of main.content. Defaults to subview of Dashboard currently.
         *  - main.content - this is the default subview of the Layout Main area.
         * @requires {Object} $stateProvider
         * @param {boolean} requiresLogin - This tells the app to fire the auth check or not.
         * @param {Array} roles - This is a String Array of the roles accepted in the app.
         * @description
         *      - name -    the name of the state.  dot notation for child views, inheriting the parent.
         *                  'main' is the master view with the navigation, etc.
         *                  'main.dashboard' would be the child view, changing only the main.content views.
         *      - url -     the URL used to access the state.  Child views nest the URL automationcally.  '/main/dashboard'
         *      - templateURL - the Path to the template
         *      - controller - Name of the controller
         *      - controllerAs - This is how you use the 'vm' notation.
         *      - data -    Incoming data to resolve for each route.
         *      - views -   The named subviews.
         *
         *      Read more at: https://github.com/angular-ui/ui-router, https://github.com/angular-ui/ui-router/wiki
         */
        $stateProvider
            .state({
                name: "root",
                url: "",
                data: {
                    pageTitle: "Home"
                },
                views: {
                    "navigation.global": {
                        templateUrl: "layout/global/navigation-global.html",
                        controller: "NavGlobalController",
                        controllerAs: "vm"
                    },
                    "navigation.sidebar": {
                        templateUrl: "layout/sidebar/navigation-sidebar.html",
                        controller: "NavSidebarController",
                        controllerAs: "vm"
                    },
                    "main.content": {
                        templateUrl: "components/dashboard/dashboard.html",
                        controller: "DashboardController",
                        controllerAs: "vm"
                    }
                },
                resolve: {
                    // NOTE: The following resolve keys MUST still be injected into the child states if you want to wait for the promises to be resolved
                    // before instantiating the children. The advantage of defining at root level resolve is that we need not duplicate the resolve code.
                    // Any child state that depends on user being logged in (which must be ALL) should inject the last resolve in the chain - initRootState
                    // to ensure the app root state is set before child state is instantiated. This is especially needed when user directly navigates to the
                    // child state url from a bookmark.
                    /**
                     * A handy resolve to indicate all the resolves in root state are completed.
                     * That way in future if there is a new root state resolve added, no need to update all the
                     * child states' code to use the last resolve. All you need to do is update the injection in here.
                     */
                    initRootState: ["logger", function (logger) {
                        logger.info("Root state resolved");
                    }]
                }
            });
    }

})();
