(function () {
    "use strict";

    angular.module("app.patterns")
        .config(configure);

    configure.$inject = ["$stateProvider", "markedProvider"];
    /**
     * @ngdoc function
     * @name patternLibraryConfig
     * @memberof app.patterns
     * @summary
     * This is the configuration of the States and Routes
     *
     * @requires markedProvider
     */
    function configure ($stateProvider, markedProvider) {
        $stateProvider.state({
            name: "patterns",
            parent: "root",
            url: "/patterns",
            data: {
                // Keeping the permissions here as an example, even though we do not have viewDashboard permission
                // We will definitely have editDashboard permission in future, so that state can define the permission
                // And controller can verify against logged in user permissions and show proper error message.
                permissions: ["default"],
                pageTitle: "Pattern Library"
            },
            views: {
                "main.content@": {
                    templateUrl: "components/patterns/view.html",
                    controller: "PatternsController",
                    controllerAs: "vm"
                }
            }
        });
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            /**
             * @ngdoc method
             * @memberof app.patterns
             * @summary
             *  highlight config.
             */
            highlight: function (code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code, true).value;
                } else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });
    }
})();
