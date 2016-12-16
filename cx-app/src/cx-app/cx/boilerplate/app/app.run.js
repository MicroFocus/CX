(function () {
    "use strict";

    angular.module("app")
        .run(runBlock);

    runBlock.$inject = [
        "gettextCatalog",
        "appConfig",
        "logger"
    ];
    /**
     * runBlock is the initialization of the app.
     *
     * @param {Object} gettextCatalog
     * @param {Object} appConfig
     */
    function runBlock (gettextCatalog, appConfig, logger) {
        // This block is for translation/i18n.
        gettextCatalog.setCurrentLanguage(appConfig.locale);
        gettextCatalog.debug = appConfig.highlightMissingTranlation;
        gettextCatalog.loadRemote("i18n/resources-locale_" + appConfig.locale + ".json");
        hljs.initHighlightingOnLoad();
    }
})();
