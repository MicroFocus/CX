// jscs:disable disallowMultipleLineBreaks
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "../",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine"],

        // list of files / patterns to load in the browser
        files: [
            "test/karma.readJSON.js",
            // bower:js
            "app/_assets/bower/jquery/dist/jquery.js",
            "app/_assets/bower/angular/angular.js",
            "app/_assets/bower/angular-animate/angular-animate.js",
            "app/_assets/bower/angular-aria/angular-aria.js",
            "app/_assets/bower/angular-cookies/angular-cookies.js",
            "app/_assets/bower/angular-filter/dist/angular-filter.js",
            "app/_assets/bower/angular-messages/angular-messages.js",
            "app/_assets/bower/moment/moment.js",
            "app/_assets/bower/angular-moment/angular-moment.js",
            "app/_assets/bower/angular-resource/angular-resource.js",
            "app/_assets/bower/angular-sanitize/angular-sanitize.js",
            "app/_assets/bower/angular-gettext/dist/angular-gettext.js",
            "app/_assets/bower/angular-ui-router/release/angular-ui-router.js",
            "app/_assets/bower/angular-bootstrap/ui-bootstrap-tpls.js",
            "app/_assets/bower/angular-growl-v2/build/angular-growl.js",
            "app/_assets/bower/angular-ui-grid/ui-grid.js",
            "app/_assets/bower/oclazyload/dist/ocLazyLoad.js",
            "app/_assets/bower/Sortable/Sortable.js",
            "app/_assets/bower/Sortable/ng-sortable.js",
            "app/_assets/bower/marked/lib/marked.js",
            "app/_assets/bower/angular-marked/dist/angular-marked.js",
            "app/_assets/bower/adf-angular-dashboard-framework/dist/angular-dashboard-framework-tpls.js",
            "app/_assets/bower/js-yaml/dist/js-yaml.js",
            "app/_assets/bower/highlightjs/highlight.pack.js",
            "app/_assets/bower/angular-mocks/angular-mocks.js",
            // endbower

            "app/app.module.js",
            "app/*.js",

            "app/core/{,**/,**/**/}*.module.js",
            "app/layout/{,**/,**/**/}*.module.js",
            "app/components/{,**/,**/**/}*.module.js",

            "app/core/{,**/,**/**/}*.{config,controller,directive,factory,run,service}.js",
            "app/layout/{,**/,**/**/}*.{config,controller,directive,factory,run,service}.js",
            "app/components/{,**/,**/**/}*.{config,controller,directive,factory,run,service}.js",

            "app/core/{,**/,**/**/}*spec.js",
            "app/layout/{,**/,**/**/}*spec.js",
            "app/components/{,**/,**/**/}*spec.js",

            "build/**/*.html",

            {
                pattern: "test/mock/*.json",
                included: false
            }
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "app/!(_assets)/**/*.js": ["coverage"]
        },

        plugins: [
            "karma-chrome-launcher",
            "karma-phantomjs-launcher",
            "karma-coverage",
            "karma-jasmine",
            "karma-spec-reporter"
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["spec", "coverage"],

        coverageReporter: {
            dir: "logs/",
            reporters: [
                { type: "html", subdir: "report-html" },
                { type: "lcov", subdir: "report-lcov" },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                { type: "cobertura", subdir: ".", file: "cobertura.txt" },
                { type: "lcovonly", subdir: ".", file: "report-lcovonly.txt" },
                { type: "teamcity", subdir: ".", file: "teamcity.txt" },
                { type: "text" }
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // 'PhantomJS', 'Chrome'
        browsers: ["PhantomJS"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
