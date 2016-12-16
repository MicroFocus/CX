(function () {
    "use strict";

    angular.module("app.widgets.messages")
        .config(configure);

    configure.$inject = ["dashboardProvider"];
    /**
     * This is the configuration of the States and Routes
     *
     * @param {Object} dashboardProvider
     */
    function configure (dashboardProvider) {
        dashboardProvider
            .widget("messages", {
                title: "Messages",
                description: "Displays a random message",
                templateUrl: "components/widgets/messages/messages-view.html",
                controller: "MessagesController",
                config: {
                    icon: "icon-link"
                }
            });
    }
})();
