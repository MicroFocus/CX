(function () {
    "use strict";

    angular.module("app.patterns")
        .config(configure);

    configure.$inject = ["$stateProvider", "markedProvider", "growlProvider"];
    /**
     * @ngdoc config
     * @name patterns_config
     * @memberof app.patterns
     * @summary
     * This is the configuration of the Routes and Markdown Configuration
     *
     * @requires $stateProvider
     * @requires markedProvider
     * @requires growlProvider
     */
    function configure ($stateProvider, markedProvider, growlProvider) {
        /**
         * @ngdoc property
         * @name state_config
         * @memberof app.patterns.patterns_config
         *
         * @property {Object} state
         * @property {string} state.name - "patterns", name of state.
         * @property {string} state.parent - "root", the state parent.
         * @property {string} state.url - "/patterns", how you access this state
         * @property {Object} state.data
         * @property {Array} state.data.permissions - Who can view this state.
         * @property {string} state.data.pageTitle - Used to title Web Page Titles
         * @property {Object} state.views
         * @property {Object} state.views."main.content@" - The Named Subview.
         * @property {string} state.views."main.content@".templateUrl - The path to the view state of this page
         * @property {string} state.views."main.content@".controller - The Controller Name
         * @property {string} state.views."main.content@".controllerAs - To access controller as `this` object, `vm`
         * @property {Object} markedProvider
         * @property {boolean} markedProvider.gfm
         * @property {boolean} markedProvider.tables
         * @property {Function} markedProvider.highlight
         * @property {Object} growlProvider
         * @property {boolean} growlProvider.globalDisableCountDown - Turns off/on the Global Countdown
         * @property {boolean} growlProvider.onlyUniqueMessages - Turns off/on the ability to filter to Unique messages.
         */
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

        growlProvider.globalDisableCountDown(false);
        growlProvider.onlyUniqueMessages(false);
    }
})();
