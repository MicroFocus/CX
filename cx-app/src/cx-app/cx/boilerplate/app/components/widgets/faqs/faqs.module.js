(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name app.widgets.faqs
     * @memberof app
     * @requires adf
     * @requires adf.provider
     * @requires app.core.constants
     * @requires app.core.logger
     */
    angular.module("app.widgets.faqs", [
        "adf",
        "adf.provider",
        "hc.marked",
        "app.core.constants",
        "app.core.logger"
    ]);
})();
