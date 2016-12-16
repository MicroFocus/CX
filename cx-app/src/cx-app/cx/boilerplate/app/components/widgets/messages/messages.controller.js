(function () {
    "use strict";

    angular
        .module("app.widgets.messages")
        .controller("MessagesController", MessagesController);

    MessagesController.$inject = [
        "$scope",
        "$rootScope",
        "$interval",
        "logger",
        "messageService",
        "gettext",
        "appConfig"
    ];

    /**
     * @ngdoc controller
     * @name messagesController
     * @memberof app.widgets.messages
     * @summary
     *  The Messages Module Controller
     * @requires $scope
     * @requires $rootScope
     * @requires $interval - used for data refreshing.
     * @requires {@Link app.core.logger}
     * @requires messageService
     * @requires gettext
     * @requires appConfig - the angular constants from config.json.  widget.config is something else.
     * @constructor
     */
    function MessagesController ($scope,
                                 $rootScope,
                                 $interval,
                                 logger,
                                 messageService,
                                 gettext,
                                 appConfig) {
        var vm = this;
        // This sets up the widget on a refresh schedule.
        var refreshInterval = 500000;
        var promise = $interval(function () {
            if ($rootScope.isEditMode !== true) {
                activate();
            }
        }, refreshInterval ? refreshInterval : appConfig.refresh);

        activate();

        /**
         * @ngdoc function
         * @name activate
         * @memberof app.widgets.messages.messagesController
         * @summary
         * activate function
         */
        function activate () {
            gettext("Messages");
            gettext("Displays a random message");
            $scope.message = messageService.getMessage();
        }

        /**
         * @name reloadWidgetData
         * @memberof app.widgets.messages.messagesController
         * @summary
         *  This is the hook we want all widgets to have; so we can globally refresh the data.
         */
        $scope.$on("reloadWidgetData", function () {
            // Call to function here to refresh data.
            // logger.info("reloadWidgetData caught within Links Widget.  Activating.");
            activate();
        });

        /**
         * @ngdoc function
         * @name dataDestroy
         * @memberof app.widgets.messages.messagesController
         * @summary
         *  We want to destroy the interval on destroying this widget scope.
         */
        $scope.$on("$destroy", function () {
            $interval.cancel(promise);
        });
    }
})();
