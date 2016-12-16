(function() {
    "use strict";

    angular
        .module("app.landing")
        .config(configure);

    configure.$inject = ["$stateProvider"];

    /**
     * @name app.landing.config
     * @memberof app.landing
     * @param {Object} $stateProvider
     */
    function configure ($stateProvider) {
        $stateProvider.state({
            name: "landing",
            parent: "root",
            data: {
                pageTitle: "Landing Page"
            },
            views: {
                "main.content@": {
                    templateUrl: "components/landing/landing.html",
                    controller: "LandingController"
                }
            },
            resolve:  {
                init: ["initRootState", function (initRootState) {
                    // Explicit root state resolve injection to prevent early child state instatitation.
                }]
            }
        });
    }
})();
