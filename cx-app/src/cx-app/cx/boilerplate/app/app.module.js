(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name app
     * @requires {@Link app.core} - App Core Modules
     * @requires {@Link app.alerts} - App Alert Module
     * @requires {@Link app.layout} - Layout Module
     * @requires {@Link app.landing} - Landing Module
     */
    angular.module("app", [
        "app.core",
        "app.dashboard",
        "app.layout",
        "app.landing",
        "app.patterns",
        "app.widgets"
    ]);

})();
