(function() {
    "use strict";

    angular
        .module("app.landing")
        .controller("LandingController", LandingController);

    LandingController.$inject = ["logger", "$state"];

    /**
     * @ngdoc controller
     * @name app.landing.landingController
     * @memberof app.landing
     * @summary
     *  The Controller for the Landing Module
     *
     * @param {Function} logger
     * @param {Object} $state
     *
     * @constructor
     */
    function LandingController (logger, $state) {
        var vm = this;

        activate();

        /**
         * activate function
         *
         * @memberof app.landing.landingController
         */
        function activate () {
            logger.info("LandingController activated");

            // This is just a simple redirect to dashboard for D5, in future you will get the landing page URL
            // from user preferences and redirect to that.
            $state.go("dashboard");
        }
    }
})();
