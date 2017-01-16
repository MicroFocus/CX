(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name patterns
     * @memberof app
     *
     * @summary
     * The Pattern Library Module.  This module reads in the Markdown patterns in the docs folder, and generates dynamic
     * pages based upon those markdown files.  The Demo Controller is the javascript controller that runs the demo code.
     *
     * @requires hc.marked
     * @requires ui.grid
     * @requires .ui.grid.pagination
     * @requires app.core.constants
     * @requires app.core.logger
     * @requires ui.bootstrap
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
