(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name app.dashboard
     * @memberof app
     * @requires adf
     * @requires adf.provider
     * @requires ngResource
     * @requires {@link app.core.logger}
     * @requires angular-growl
     * @summary
     *  The Dashboard Module, mainly consisting of the default Structures in the config.
     */
    angular.module("app.dashboard", [
        "adf",
        "adf.provider",
        "ngResource",
        "app.core.constants",
        "app.core.logger",
        "angular-growl",
        "oc.lazyLoad"
    ])
    /**
     * @name app.dashboard.adfTemplatePath
     * @memberof app.dashboard
     * @requires adf
     * @requires adf.provider
     * @summary
     *  When we load the Dashboard Framework we pass in the custom value of adfTemplatePath which points
     *  to the ./components/dashboard/adf-templates/ html files.  These files have been annotated to use localization.
     * @example
     * .value("adfTemplatePath", "components/dashboard/adf-templates/");
     */
    .value("adfTemplatePath", "components/dashboard/adf-templates/");

})();
