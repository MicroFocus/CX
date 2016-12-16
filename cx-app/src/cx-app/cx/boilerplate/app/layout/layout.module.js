(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name app.layout
     * @memberof app
     * @requires app.layout.global
     * @requires app.layout.sidebar
     */
    angular.module("app.layout", [
        "app.layout.global",
        "app.layout.sidebar",
        "app.core"
    ]);

})();
