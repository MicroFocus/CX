(function () {
    "use strict";
    /**
     * @ngdoc directive
     * @name focus
     * @memberof app.core.focus
     * @summary
     *  This directive sets the focus on the element passed as a parameter by default
     *
     * @requires $timeout
     */
    angular.module("app.core.focus")
           .directive("focus", function ($timeout) {
               return {
                    scope: {
                        trigger: "@focus"
                    },
                    /**
                     * @ngdoc function
                     * @summary
                     * registers the DOM listerners
                     *
                     * @requires scope
                     * @requires element
                     */
                    link: function(scope, element) {
                        scope.$watch("trigger", function(value) {
                            if (value === "true") {
                                $timeout(function() {
                                    element[0].focus();
                                });
                            }
                        });
                    }
                };
           });
})();
