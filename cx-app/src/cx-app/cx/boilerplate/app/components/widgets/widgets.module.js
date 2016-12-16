(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name app.widgets
     * @memberof app
     * @requires app.widgets.links - link widgets module
     * @requires app.widgets.faqs - FAQs widget module
     * @requires app.widgets.messages - Pattern Library widget module
     */
    angular.module("app.widgets", [
        // widgets
        "app.widgets.faqs",
        "app.widgets.links",
        "app.widgets.messages"
    ]);
})();
