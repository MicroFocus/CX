(function () {
    "use strict";

    angular
        .module("app.patterns")
        .filter("trim", TrimFilter);

    TrimFilter.$inject = [
        "logger"
    ];

    /**
     * @ngdoc filter
     * @name TrimFilter
     * @memberof app.patterns
     * @summary
     *  The Pattern Library Trim Filter for the code blocks
     * @requires {@Link app.core.logger}
     */
    function TrimFilter (logger) {
        return function (value) {
            if (!angular.isString(value)) {
                return value;
            }
            return value.replace(/^\s+|\s+$/g, ""); // you could use .trim, but it's not going to work in IE<9
        };
    }
})();
