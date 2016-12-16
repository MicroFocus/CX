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
     * @name patternLibrary
     * @memberof app.patterns
     * @summary
     *  This directive contains the loading indicator that will show mostly during UI-Router resolves.
     *
     * @requires $http
     * @requires $templateCache
     * @requires $compile
     * @requires $q
     * @requires $timeout
     * @requires logger
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
            link: function (scope) {
                scope.showTab = function (tab) {
                    console.log("showTab: ", tab);
                    scope.tab = tab;
                };

                scope.$watch("tab", function (tab) {
                    console.log("watch tag: ", tab);
                    scope.tab = null;
                    scope.tab = tab;
                });
            },
            compile: function (element, attr) {
                var count = 0;

                return function (scope, element) {
                    var changeCounter = 0;

                    scope.$watch("patterns", function (newValue) {
                        // logger.info("patterns watch fired: ", newValue);
                        if (newValue) {
                            if (scope.patterns && scope.patterns.children) {
                                totalcount = scope.patterns.children.length;
                            }
                        }
                    }, true);

                    scope.showTab = function (tab) {
                        scope.tab = tab;
                    };

                    scope.$watch("tab", function (tab) {
                        scope.tab = tab;
                    });

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

                    scope.$watch("src", function (src) {
                        var thisChangeId = ++changeCounter;
                        // logger.info("srcExp watch fired: ", src);

                        if (src) {
                            $http.get(src, {
                                cache: $templateCache
                            }).success(function (response) {
                                /**
                                 * Parsing Markdown files
                                 * @type {Object}
                                 */
                                var parsedContent = {
                                    yaml: "",
                                    markdown: "",
                                    html: "",
                                    meta: {}
                                };
                                var re = /^(-{3}(?:\n|\r)([\w\W]+?)-{3})?([\w\W]*)*/;
                                var results = re.exec(response.trim());
                                var conf = {};
                                var yamlOrJson; // Flag to check if we're reading markdown or json
                                var name = "content"; // Conf element to find
                                /* Add description */
                                var $description = element.find(".patterns-description");
                                var $example = element.find(".pattern");
                                var code = element.find("code"); // the raw code to display
                                if (thisChangeId !== changeCounter) {
                                    return;
                                }
                                // logger.info("GOT RESULT: ", results);

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
                                    // code.text(conf.content.trim());
                                    code.text(codeTrimmed);

                                    /* Highlighting */
                                    // logger.info("CODE HIGHLIGHTING else", code.text);
                                    hljs.configure({useBR: true});
                                    hljs.initHighlighting();

                                    $("div.code").each(function (i, block) {
                                        hljs.highlightBlock(block);
                                    });

                                    // hljs.highlightAuto(code.text);
                                    // hljs.highlight("HTML", code);
                                }

                            }).error(function () {
                                if (thisChangeId === changeCounter) {
                                    element.html("");
                                }
                            });
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
