(function () {
    "use strict";

    angular.module("app.widgets.links")
        .config(configure);

    configure.$inject = ["dashboardProvider"];
    /**
     * This is the configuration of the States and Routes
     *
     * @param {Object} dashboardProvider
     */
    function configure (dashboardProvider) {
        dashboardProvider
            .widget("linklist", {
                title: "Links",
                description: "Displays a list of links",
                templateUrl: "components/widgets/links/links-view.html",
                controller: "LinksController",
                edit: {
                    templateUrl: "components/widgets/links/edit.html",
                    controller: "LinksController"
                },
                config: {
                    links: [
                        {
                            title: "Sentinel Support",
                            url: "https://www.netiq.com/support/kb/product.php?id=Sentinel"
                        }
                    ],
                    icon: "icon-link"
                }
            });
    }
})();
