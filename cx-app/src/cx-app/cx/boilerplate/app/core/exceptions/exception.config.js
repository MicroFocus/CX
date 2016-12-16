(function () {
    "use strict";

    angular
        .module("app.core.exception")
        .config(configure);

    configure.$inject = ["$stateProvider"];
    /**
     * This is the configuration of the States and Routes
     *
     * @param {Object} $stateProvider
     */
    function configure ($stateProvider) {
        $stateProvider.state({
            name: "exception",
            parent: "root",
            // It can later be extended by adding another param - licenseName, if we need to display
            // no valid license for "abc" feature
            url: "/exception",
            data: {
                pageTitle: "Exception"
            },
            params: {
                headerString: {
                    value: "",
                    squash: true
                },
                messageString: {
                    value: "",
                    squash: true
                },
                hiddenParam: "YES"
            },
            views: {
                "main.content@": {
                    templateUrl: "core/exceptions/exception.html",
                    controller: "ExceptionController",
                    controllerAs: "vm"
                }
            }
        });
    }

})();
