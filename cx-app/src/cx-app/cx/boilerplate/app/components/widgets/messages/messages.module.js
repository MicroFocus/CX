(function () {
    "use strict";

    /**
     * @ngdoc overview
     * @name app.widgets.messages
     * @memberof app
     * @summary
     *  The Messages Controller determines teh random message to display in the Message Widget
     * @requires {@Link app.widgets.messages.messagesController}
     */
    angular.module("app.widgets.messages", [
        "adf",
        "adf.provider",
        "app.core.constants",
        "app.core.logger"
    ]);
})();
