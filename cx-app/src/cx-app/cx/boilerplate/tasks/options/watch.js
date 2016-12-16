module.exports = {
    options: {
        /**
         * Don't use livereload on global.
         * Live reload server would be started with the watch tasks per every target.
         * This is unnecessary, because some targets (sass) do not trigger change that effects the page at that moment
         * Instead run separate task (e.g. `devlocal`) which starts the live reload server and registers only files that
         * actually should result in a page change.
         */
        // livereload: true
    },
    bower: {
        files: ["bower.json"],
        tasks: ["wiredep"]
    },
    scripts: {
        files: ["<%= cfg.paths.app %>/**/*.js"],
        tasks: [
            "jshint",
            "jscs",
            "useminPrepare",
            "concat",
            "ngAnnotate:dev",
            "usemin",
            "i18n",
            "copy:dev"
        ],
        options: {
            spawn: false
        }
    },
    gruntfile: {
        files: ["gruntfile.js"]

    },
    html: {
        files: [
            "<%= cfg.paths.app %>/{,**/}*.html"
        ],
        tasks: [
            "i18n",
            "copy:dev"
        ],
        options: {
            reload: true
        }
    },
    patterns: {
        files: [
            "<%= cfg.paths.app %>/components/patterns/docs/*.md"
        ],
        tasks: [
            "copy:dev"
        ],
        options: {
            reload: true
        }
    },
    jade: {
        files: [
            "<%= cfg.paths.app %>/**/*.jade",
            "<%= cfg.paths.app %>/**/**/*.jade",
            "<%= cfg.paths.app %>/components/**/*.jade"
        ],
        tasks: [
            "jade",
            "useminPrepare",
            "concat",
            "ngAnnotate:dev",
            "usemin",
            "i18n",
            "copy:dev"
        ],
        options: {
            reload: true
        }
    },
    sass: {
        files: [
            "<%= cfg.paths.app %>/{,*/}*.{scss,sass}",
            "<%= cfg.paths.app %>/_assets/sass/{,*/}*.{scss,sass}"
        ],  //{,*/}*.{scss,sass}'],
        tasks: [
            "sass:dev",
            // 'autoprefixer',
            "useminPrepare",
            // "concat",
            // "usemin",
            "copy:dev"
        ]
    },
    devlocal: {
        options: {
            // https://github.com/gruntjs/grunt-contrib-watch#optionslivereload
            livereload: "<%= cfg.env.livereload %>"
        },
        files: [
            "./{,*/}*.html",
            ".tmp/_assets/css/{,*/}*.css"
        ]
    }
};
