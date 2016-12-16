(function () {
    "use strict";

    angular.module("app.widgets.faqs")
        .config(configure);

    configure.$inject = ["dashboardProvider", "markedProvider"];
    /**
     * @ngdoc function
     * @name faqsConfig
     * @memberof app.widgets.faqs
     * @summary
     * This is the configuration of the States and Routes
     *
     * @requires dashboardProvider
     * @requires markedProvider
     */
    function configure (dashboardProvider, markedProvider) {
        dashboardProvider
            .widget("FAQs", {
                title: "FAQs",
                description: "Widget to show Markdown text",
                controller: "FaqsController",
                templateUrl: "{widgetsPath}/components/widgets/faqs/view.html",
                edit: {
                    templateUrl: "{widgetsPath}/components/widgets/faqs/edit.html",
                    reload: false
                },
                modalSize: "wide",
                config: {
                    faqs: [
                        {
                            heading: "ADF Widget Overview",
                            src: "/components/widgets/faqs/docs/overview.md"
                        }, {
                            heading: "ADF Widget API",
                            src: "/components/widgets/faqs/docs/api.md"
                        }, {
                            heading: "ADF Widget Config",
                            src: "/components/widgets/faqs/docs/config.md"
                        }
                    ]
                },
                option: {
                    fullScreen: true,
                    collapsible: true,
                    maximizable: true,
                    modalSize: "wide"
                }
            });
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            /**
             * @ngdoc method
             * @memberof app.widgets.faqs.faqsConfig
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
    }
})();
