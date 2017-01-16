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
     * @name trim_filter
     * @memberof app.patterns
     * @summary
     *  The Pattern Library Trim Filter for the code blocks.  Basically trim the value of the passed in string.
     *
     * @description
     * Using Regex we replace any spaces (or consecutive spaces) at the beginning AND/OR end of the string.
     * We use Rgex instead of .trim to work with IE <9.
     *
     * @example
     * <code class="language-markup">{{ code.code | trim }}</code>
     *
     * @requires {@Link app.core.logger}
     */
    function TrimFilter (logger) {
        return function (value) {
            if (!angular.isString(value)) {
                return value;
            }
            return value.replace(/^\s+|\s+$/g, "");
        };
    }
})();
