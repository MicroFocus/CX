(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name app.patterns
     * @memberof app
     * @requires hc.marked
     * @requires app.core.constants
     * @requires app.core.logger
     */
    angular.module("app.patterns", [
        "hc.marked",
        "ui.grid",
        "ui.grid.pagination",
        "app.core.constants",
        "app.core.logger",
        "ui.bootstrap"
    ]);
})();
