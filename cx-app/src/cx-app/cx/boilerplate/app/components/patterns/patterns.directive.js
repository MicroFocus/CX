(function () {
    "use strict";

    angular
        .module("app.patterns")
        .directive("patterns", patterns);

    patterns.$inject = [
        "$http",
        "$templateCache",
        "$compile",
        "$q",
        "$timeout",
        "logger"
    ];

    /**
     * @ngdoc directive
     * @name patterns_directive
     * @memberof app.patterns
     * @summary
     *  This directive contains the loading indicator that will show mostly during UI-Router resolves.
     *
     * @example
     * The initial holder directive, filled out from the $scope.patterns defined in the controller.
     * <div patterns="pattern" src="pattern.path" source="source"></div>
     *
     * This in turns fills out the following template with the pertinant parts:
     *  <div ng-class="{ 'col-md-6': patterns.layout === 2, 'col-md-12': patterns.layout === 1 }">
     *  <div class="patterns-description"></div>
     *  <div class="pattern"></div>
     *  <code class="language-markup">{{ code.code | trim }}</code>
     *
     * @requires $http
     * @requires $templateCache
     * @requires $compile
     * @requires $q
     * @requires $timeout
     * @requires logger
     *
     * @property {string} restrict - "A" Attribute Only
     * @property {boolean} replace - "false" Does not replace template
     * @property {string} templateUrl - "components/patterns/patterns.template.html"
     * @property {Object} scope
     * @property {string} scope.patterns - "=" pass through object
     * @property {string} scope.src - "=" Ends up mapping to the $scope.patterns.children[i].path.  This is parsed into the templates
     * @property {string} scope.source - "=" pass through object
     * @property {Function} scope.link
     * @property {Function} scope.compile
     */
    function patterns ($http, $templateCache, $compile, $q, $timeout, logger) {
        var totalcount = 0;
        // jscs:disable
        return {
            restrict: "A",
            replace: false,
            templateUrl: "components/patterns/patterns.template.html",
            scope: {
                patterns: "=",
                src: "=",
                source: "="
            },
            /**
             * @ngdoc function
             * @name link
             * @memberof app.patterns.patterns_directive
             * @summary
             * The Link Function of the Patterns Direction.
             *
             * @description
             * Has two exposed functions; showTab and watch the tab elements.
             *
             * @param scope
             */
            link: function (scope) {
                /**
                 * @ngdoc function
                 * @name showTab
                 * @memberof app.patterns.patterns_directive.link
                 * @summary
                 * Sets scope.tab to passed in tab value.
                 *
                 * @param tab
                 */
                scope.showTab = function (tab) {
                    scope.tab = tab;
                };

                /**
                 * @ngdoc watch
                 * @name watch_tab
                 * @memberof app.patterns.patterns_directive.link
                 * @summary
                 * Sets scope.tab to null, then to new value.
                 *
                 * @param tab
                 */
                scope.$watch("tab", function (tab) {
                    console.log("watch tag: ", tab);
                    scope.tab = null;
                    scope.tab = tab;
                });
            },

            /**
             * @ngdoc function
             * @name compile
             * @memberof app.patterns.patterns_directive
             * @summary
             * Compiles the element using the attributes.
             *
             * @param {Object} element
             * @param {Object} attr
             */
            compile: function (element, attr) {
                var count = 0;

                return function (scope, element) {
                    var changeCounter = 0;

                    /**
                     * @ngdoc watch
                     * @name patterns_watch
                     * @memberof app.patterns.patterns_directive.compile
                     * @summary
                     * Watches the patterns attributes, and if it finds the JSON object updated it sets the
                     * totalcount and the scope.patterns.
                     *
                     * @param {Object} newValue
                     */
                    scope.$watch("patterns", function (newValue) {
                        // logger.info("patterns watch fired: ", newValue);
                        if (newValue) {
                            if (scope.patterns && scope.patterns.children) {
                                totalcount = scope.patterns.children.length;
                            }
                        }
                    }, true);

                    /**
                     * @ngdoc function
                     * @name showTab
                     * @memberof app.patterns.patterns_directive.compile
                     * @summary
                     * Sets scope.tab to passed in tab value.
                     *
                     * @todo determine if this duped code within link is needed in both places
                     * @param tab
                     */
                    scope.showTab = function (tab) {
                        scope.tab = tab;
                    };

                    /**
                     * @ngdoc watch
                     * @name watch_tab
                     * @memberof app.patterns.patterns_directive.compile
                     * @summary
                     * Sets scope.tab to null, then to new value.
                     *
                     * @todo determine if this duped code within link is needed in both places
                     * @param tab
                     */
                    scope.$watch("tab", function (tab) {
                        scope.tab = tab;
                    });

                    /**
                     * @ngdoc watch
                     * @name source_watch
                     * @memberof app.patterns.patterns_directive.compile
                     * @summary
                     * If the source attribute is populated; we loop through the JSON object to find the codeTypes and poulate that.
                     *
                     * @property {Object} scope.codeTypes
                     * @property {Object} scope.tabs
                     * @property {string} scope.tabs.title - maps to code match.  (html|css|sass|scss|js)
                     * @property {string} scope.tabs.code - maps to key+1 (next item in array) OR if no match +2.
                     * @todo - figure out the plus+2 match in the codeTypes
                     *
                     * @example
                     * // Always in groups of 3.
                     * // First item always empty.
                     * $scope.codeTypes: [
                     *      "",
                     *      "js",
                     *      "↵  HTML/JS CONTENT"
                     * ]
                     */
                    scope.$watch("source", function (source) {
                        scope.tabs = [];
                        if (source) {
                            angular.forEach(source, function (value, i) {
                                var codeTypes = value.split(/^(html|sass|scss|js)/g);
                                angular.forEach(codeTypes, function (code, key) {
                                    code = code.trim();
                                    switch (code) {
                                        case "":
                                            break;
                                        case "html":
                                            scope.tabs.push({
                                                title: code,
                                                code: codeTypes[key + 1].trim() || codeTypes[key + 2].trim()
                                            });
                                            break;
                                        case "scss":
                                            scope.tabs.push({
                                                title: code,
                                                code: codeTypes[key + 1].trim() || codeTypes[key + 2].trim()
                                            });
                                            break;
                                        case "js":
                                            scope.tabs.push({
                                                title: code,
                                                code: codeTypes[key + 1].trim() || codeTypes[key + 2].trim()
                                            });
                                            break;
                                        default:
                                            break;

                                    }
                                }, codeTypes);
                                scope.codeTypes = codeTypes;
                            }, source);
                            scope.source = source;
                        }
                        if (scope.tabs[0]) {
                            scope.tab = scope.tabs[0].title;
                        }
                    });

                    /**
                     * @ngdoc watch
                     * @name src_watch
                     * @memberof app.patterns.patterns_directive.compile
                     * @summary
                     * If the src attribute is modified we loop through and parse the markdown.
                     *
                     * @property {Object} scope.codeTypes
                     * @property {Object} scope.tabs
                     *
                     * @requires $http
                     */
                    scope.$watch("src", function (src) {
                        var thisChangeId = ++changeCounter;

                        if (src) {
                            // Pull the markdown document
                            $http.get(src, {
                                cache: $templateCache
                            }).success(function (response) {
                                var parsedContent = {
                                    yaml: "",
                                    markdown: "",
                                    html: "",
                                    meta: {}
                                };
                                // @todo document this weird regex
                                var re = /^(-{3}(?:\n|\r)([\w\W]+?)-{3})?([\w\W]*)*/;
                                var results = re.exec(response.trim());
                                var conf = {};
                                var yamlOrJson; // Flag to check if we're reading markdown or json
                                var name = "content"; // Conf element to find
                                // Elements on
                                var $description = element.find(".patterns-description");
                                var $example = element.find(".pattern");
                                var code = element.find("code"); // the raw code to display
                                if (thisChangeId !== changeCounter) {
                                    return;
                                }

                                /* Increment counter */
                                count++;

                                if ((yamlOrJson = results[2])) {
                                    if (yamlOrJson.charAt(0) === "{") {
                                        conf = JSON.parse(yamlOrJson);
                                    } else {
                                        conf = jsyaml.load(yamlOrJson);
                                    }
                                }

                                conf[name] = results[3] ? results[3] : results[2];

                                if (conf.description) {
                                    parsedContent.markdown = marked(conf.description);
                                    $description.html(parsedContent.markdown);

                                    if (conf.meta) {
                                        parsedContent.markdown = parsedContent.markdown + marked(conf.meta);
                                        $description.html(parsedContent.markdown);
                                    }
                                } else {
                                    /* If there is no description: Hide it */
                                    $description.hide();
                                }

                                /* Element preview */
                                $example.html(conf.html);

                                /* Compile Angular directives */
                                $compile(element.contents())(scope);

                                scope.source = conf.content.split(/```/g);
                                attr.source = scope.source;

                                if (code.length > 1) {
                                    angular.forEach(code, function (value, key) {
                                        this.push(key + ": " + value);

                                        /* Adds codes to the code block */
                                        // code[key].text = conf.content.trim();
                                        // code.html(codeTrimmed);

                                    }, code);
                                } else {
                                    var codeText = conf.content;
                                    var codeTrimmed = codeText.replace(/(^[\-,\n,\r]+```.*\n)+/g, "");

                                    /* Adds codes to the code block */
                                    code.text(codeTrimmed);

                                    /* Highlighting */
                                    hljs.configure({useBR: true});
                                    hljs.initHighlighting();

                                    // @todo remove this jquery
                                    $("div.code").each(function (i, block) {
                                        hljs.highlightBlock(block);
                                    });

                                    // hljs.highlightAuto(code.text);
                                    // hljs.highlight("HTML", code);
                                }

                            }).error(
                                /**
                                 * @ngdoc callback
                                 * @name error_callback
                                 * @memberof app.patterns.patterns_directive.compile
                                 * @summary
                                 * If there is an error calling the http pattern, empty the element
                                 */
                                function () {
                                    if (thisChangeId === changeCounter) {
                                        element.html("");
                                    }
                                }
                            );
                        } else {
                            element.html("");
                        }
                    });
                };
            }
        };
        // jscs:enable
    }
})();
