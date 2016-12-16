(function () {
    "use strict";

    angular
        .module("app.core.logger")
        .factory("logger", logger);

    logger.$inject = ["$log"];

    /**
     * @ngdoc factory
     * @name loggerFactory
     * @memberof app.core.logger
     * @requires $log
     * @returns {{error: error, info: info, success: success, warning: warning, talk: talk, log: (*|$log.log|Function)}}
     */
    function logger ($log) {
        var service = {
            dev: dev,
            error: error,
            info: info,
            success: success,
            warning: warning,
            talk: talk,
            enable: enable,
            enabled: true,
            log: $log.log
        };

        return service;

        /**
         * @ngdoc function
         * @name dev
         * @memberof app.core.logger.loggerFactory
         * @param {string} message
         */
        function dev (message) {
            if (service.enabled) {
                $log.info(message);
            }
        }

        /**
         * @ngdoc function
         * @name error
         * @memberof app.core.logger.loggerFactory
         * @param {string} message
         * @param {Object} data
         * @param {string} title
         */
        function error (message, data, title) {
            data = data || "";
            message = message || "";
            title = title || "";
            switch (arguments.length) {
                case 1:
                    data = "";
                    break;
                case 2:
                    title = "";
                    break;
                case 3:
                    break;
                default:
                    throw new Error("illegal argument count");
            }
            // add some custom logger
            if (service.enabled) {
                $log.error("Error: " + message, data, title);
            }
        }

        /**
         * @ngdoc function
         * @name info
         * @memberof app.core.logger.loggerFactory
         * @param {string} message
         * @param {Object} data
         * @param {string} title
         */
        function info (message, data, title) {
            data = data || "";
            message = message || "";
            title = title || "";
            switch (arguments.length) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                default:
                    throw new Error("illegal argument count");
            }
            if (service.enabled) {
                $log.info("Info: " + message, data, title);
            }
        }

        /**
         * @ngdoc function
         * @name success
         * @memberof app.core.logger.loggerFactory
         * @param {string} message
         * @param {Object} data
         * @param {string} title
         */
        function success (message, data, title) {
            data = data || "";
            message = message || "";
            title = title || "";
            switch (arguments.length) {
                case 1:
                    data = "";
                    break;
                case 2:
                    title = "";
                    break;
                case 3:
                    break;
                default:
                    throw new Error("illegal argument count");
            }
            if (service.enabled) {
                $log.info("Success: " + message, data, title);
            }
        }

        /**
         * @ngdoc function
         * @name warning
         * @memberof app.core.logger.loggerFactory
         * @param {string} message
         * @param {Object} data
         * @param {string} title
         */
        function warning (message, data, title) {
            data = data || "";
            message = message || "";
            title = title || "";
            switch (arguments.length) {
                case 1:
                    data = "";
                    break;
                case 2:
                    title = "";
                    break;
                case 3:
                    break;
                default:
                    throw new Error("illegal argument count");
            }
            if (service.enabled) {
                $log.warn("Warning: " + message, data, title);
            }
        }

        /**
         * @ngdoc function
         * @name talk
         * @memberof app.core.logger.loggerFactory
         * @requires console
         * @requires window.speechSynthesis
         * @summary
         * logger.talk will fire off window.speechSynthesis.  It does use the Web Speech API
         * https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis
         * https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
         *
         * @example
         * logger.talk("THIS PART WILL BE SPOKEN");
         */
        function talk (message, data, title) {
            if (console.log.name !== "talkLog") {
                console.l = console.log;
                /**
                 * talkLog
                 */
                console.log = function talkLog () {
                    Array.prototype.forEach.call(arguments, function (a) {
                        if (typeof a !== "string") {
                            try {
                                a = "Object: " + JSON.stringify(a);
                            } catch (e) {
                                console.log(e);
                            }
                        }
                        window.speechSynthesis.speak(new SpeechSynthesisUtterance(a));
                    });
                    console.l.apply(this, arguments);
                };
            }
            if (service.enabled) {
                console.log(message);
            }
        }

        /**
         * @ngdoc function
         * @name enable
         * @memberof app.core.logger.loggerFactory
         */
        function enable (val) {
            service.enabled = val;
        }
    }
}());
