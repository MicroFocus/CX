(function () {
    "use strict";

    angular
        .module("app.core.injectCss")
        .service("injectCss", injectCss);

    injectCss.$inject = ["$q", "$http"];

    /**
     * @ngdoc factory
     * @name app.core.injectCss.cssService
     * @memberof app.core.injectCss
     */
    function injectCss ($q, $http) {
        var service = {
            createLink: createLink,
            checkLoaded: checkLoaded,
            setCss: setCss,
            removeCss: removeCss,
            createTheme: createTheme
        };
        return service;

        /**
         * @name app.core.injectCss.cssService.createLink
         * @summary
         *  This creates the link to insert.
         * @memberof app.core.injectCss.cssService
         * @param {string} id
         * @param {string} url
         * @returns {string}
         */
        function createLink (id, url) {
            var link = document.createElement("link");
            link.id = id;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;

            return link;
        }

        /**
         * @name app.core.injectCss.cssService.createTheme
         * @summary
         * This creates the theme link to insert.
         * @memberof app.core.injectCss.cssService
         * @returns {string}
         */
        function createTheme () {
            var theme = document.createElement("link");
            theme.id = "theme";
            theme.rel = "stylesheet";
            theme.type = "text/css";
            theme.href = "/styles/theme.css";

            return theme;
        }

        /**
         * @name app.core.injectCss.cssService.checkLoaded
         * @summary
         * This will check that the css is loaded.
         * @memberof app.core.injectCss.cssService
         * @param {string} url
         * @param {Object} deferred
         * @param {number} tries
         */
        function checkLoaded (url, deferred, tries) {
            var i;
            var href;
            for (i in document.styleSheets) {
                href = document.styleSheets[i].href || "";
                if (href.split("/").slice(-1).join() === url.split("/").slice(-1).join()) {
                    deferred.resolve();
                    return;
                }
            }
            tries++;
            /**
             * set Timeout to recheck if loaded.
             */
            setTimeout(function () {
                checkLoaded(url, deferred, tries);
            }, 50);
        }

        /**
         * This will set the css in the header.
         *
         * @memberof app.core.injectCss.cssService
         * @param {string} id
         * @param {string} url
         * @returns {*}
         */
        function setCss (id, url) {
            var tries = 0;
            var deferred = $q.defer();
            var link;
            var theme = createTheme();

            if (!angular.element("link#" + id).length) {
                link = createLink(id, url);
                link.onload = deferred.resolve;
                angular.element("head").append(link);

                // Now that we've added the custom CSS, make sure the theme is loaded after.
                if (!angular.element("link#theme").length) {
                    // no theme found so insert it.
                    angular.element("head").append(theme);
                } else {
                    // found that link, remove it, then append it.
                    angular.element("link#theme").remove();
                    angular.element("head").append(theme);
                }
            }
            checkLoaded(url, deferred, tries);

            return deferred.promise;
        }

        /**
         * Removes the css from the header
         *
         * @memberof app.core.injectCss.cssService
         * @param {string} id
         * @param {string} url
         * @returns {*}
         */
        function removeCss (id, url) {
            var deferred = $q.defer();
            var link;

            if (!angular.element("link#" + id).length) {
                // no link found
                return false;
            } else {
                // found that link, remove it.
                angular.element("link#" + id).remove();
            }
            return deferred.promise;
        }
    }
})();

