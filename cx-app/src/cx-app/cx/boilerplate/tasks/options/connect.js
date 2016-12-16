module.exports = {
    options: {
        protocol: "<%= cfg.env.dev.local.protocol %>",
        hostname: "<%= cfg.env.dev.local.host %>",
        port: "<%= cfg.env.dev.local.port %>",
        //  open: {
        //      // target: 'http://localhost:9000', NW!
        //      // name of the app that opens, ie: open, start, xdg-open
        //      appName: "<%= cfg.env.browser %>"
        //  },
        // otherwise it exits with the end of task
        // keepalive: false // watch adds this
        livereload: true     // use browser extension
    },
    /**
     * Run local dev (non min, non concat) version
     * served from `app` folder and parent `.tmp` and `bower_components`
     */
    devlocal: {
        options: {
            /**
             * middleware connect - dev
             *
             * @param {Function} connect
             * @returns {*[]}
             */
            middleware: function (connect) {
                return [
                    // TODO: (@jvorisek) - Why the templates do not work here, .e.g. <%= pkg.paths.app%>
                    // connect.static(".tmp"),
                    connect().use("/_assets/bower", connect.static("./app/_assets/bower")),
                    connect().use("/i18n", connect.static("./i18n")),
                    connect().use("/styles", connect.static("./styles")),
                    connect.static("build")
                ];
            }
        }
    },
    prodlocal: {
        options: {
            base: "<%= cfg.paths.build %>",

            /**
             * middleware connect - prod ONLY FOR THEME
             *
             * @param {Function} connect
             * @returns {*[]}
             */
            middleware: function (connect) {
                return [
                    connect().use("/styles", connect.static("./<%= cfg.paths.theme %>")),
                    connect.static("build")
                ];
            }
        }
    },
    distlocal: {
        options: {
            base: "<%= cfg.paths.build %>",

            /**
             * middleware connect - dist ONLY FOR THEME
             *
             * @param {Function} connect
             * @returns {*[]}
             */
            middleware: function (connect) {
                return [
                    connect().use("/styles", connect.static("./<%= cfg.paths.theme %>")),
                    connect.static("build")
                ];
            }
        }
    },
    test: {
        options: {
            open: false,
            base: "<%= cfg.paths.build %>",
            /**
             * middleware connect - test
             *
             * @param {Function} connect
             * @returns {*[]}
             */
            middleware: function (connect) {
                return [
                    // TODO: (@jvorisek) - figure out why the templates do not work here, .e.g. <%= pkg.paths.build%>
                    connect().use("/_assets/bower", connect.static("./_assets/bower")),
                    connect().use("/i18n", connect.static("./i18n")),
                    connect().use("/styles", connect.static("./<%= cfg.paths.theme %>")),
                    connect.static("build")
                ];
            }
        }
    }

};
