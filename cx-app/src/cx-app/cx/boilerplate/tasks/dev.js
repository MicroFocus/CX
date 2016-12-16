module.exports = function(grunt) {
    "use strict";

    grunt.registerTask("dev", [
        "replace:sortableNg",
        "replace:sortableKnockout",
        "replace:sortableReact",

        /**
         * Cleans .tmp, build, css compiled files
         */
        "clean",

        // Creates/updates build folder with compiled html(s)
        "jade",

        /**
         * Compiles app/_assets/sass/.. to app/_assets/css/..
         * app.css, vendor.css are hardcoded links in index
         * Component SASS (our app feature styles) is being imported in app/_assets/sass/app.scss
         * Vendor CSS and SASS can be wiredep with bower:sass and bower:css inside app/_assets/sass/vendor.scss
         */
        "sass:dev",
        "sass:components",

        /**
         * Inject bower.json dependencies within block comments (<!-- bower:js -->) defined in index.jade and index.html
         * Needs to run after jade
         */
        "wiredep",

        /**
         * Parses index (html)
         * Based on build blocks (e.g. <!-- bower:js -->) generate configuration sub-tasks for concat, uglify,
         * cssmin, filerev.
         *
         * Nothing happens until the sub-tasks are called (e.g. concat:generated)
         */
        "useminPrepare",

        /**
         * Runs concat:generated from useminPrepare
         * Creates .tmp folder with concat files
         * Currently .tmp/concat/_assets/css (app.css, vendor.css) and /js (vendor.js)
         */
        "concat",

        /**
         * Creates build/app.js from _assets/components/
         * Concat all components to single file. This solves many other issues (e.g. no lazy-load, no bundling)
         */
        "ngAnnotate:dev",

        // Replaces the index.html build blocks and updates the assets references
        "usemin",

        "jshint",
        "jscs",
        "sasslint",

        // Run copy:sourceHTML which copies the native HTML files (not compiled from jade) to build directory for localization
        // This task is only needed in dev for the generation of pot file which is checked in by the developer
        // The subsequent copy task copies all the required files for the build.
        "copy:sourceHTML",

        /**
         * ----------------------------Localization----------------------------
         * Extracts annotated html & js to i18n/resources-locale_en-US.pot (assuming you annotate in English)
         * Generates i18n/resources-locale_en-US.po file
         * Compiles *.po files in to *.json
         * Generates i18n/resources-locale_xh.json file
         */
        "i18n",

        /**
         * Copy concat files ./tmp/concat/_assets (currently only js files - vendor.js) to build/_assets dir
         * Copy app asset files from app/_assets/.. (except of bower components - serve static) to build/_assets dir
         * Copy i18n files
         */
        "copy:dev",

        // Unit test
        // "test:unit",
        "connect:devlocal",
        "watch"
    ]);
};
