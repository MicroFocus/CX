(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name app.core
     * @memberof app
     * @requires {@Link ngAnimate}
     * @requires {@Link ui.router}
     * @requires {@Link ui.bootstrap}
     * @requires {@Link adf}
     * @requires {@Link adf.provider}
     * @requires {@Link ngSanitize}
     * @requires {@Link gettext}
     * @requires {@Link ngResource}
     * @requires {@Link app.login}
     * @requires {@Link app.core.auth}
     * @requires {@Link app.core.branding}
     * @requires {@Link app.core.constants}
     * @requires {@Link app.core.exception}
     * @requires {@Link app.core.injectCSS}
     * @requires {@Link app.core.interceptor}
     * @requires {@Link app.core.licensing}
     * @requires {@Link app.core.loading}
     * @requires {@Link app.core.localization}
     * @requires {@Link app.core.logger}
     * @requires {@Link app.core.utils}
     */
    angular
        .module("app.core", [
            // 3r Party Modules (Can/should some of them be referenced from the lower level?)
            "ngAnimate",
            "ui.router",
            "ui.bootstrap",
            "adf",
            "adf.provider",
            "ngSanitize",
            "ngResource",

            // Micro Focus Modules
            "app.core.confirm",
            "app.core.constants",
            "app.core.exception",
            "app.core.focus",
            "app.core.injectCss",
            "app.core.interceptor",
            "app.core.loading",
            "app.core.logger"
        ]);
})();
