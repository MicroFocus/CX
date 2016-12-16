module.exports = function(grunt) {
    "use strict";

    grunt.registerTask("prod", [

        // TODO: (@open) - Add log times
        "logging:prod",

        /**
         * Cleans .tmp, build, css compiled files
         */
        "clean",

        // Creates/updates build folder with compiled html(s)
        // "jade",

        /**
         * Translates jade to html
         * Extracts annotated html to i18n/resources-locale_en-US.pot (assuming you annotate in English)
         * Compiles the *.po file(s) (translator needs to generate inside i18n folder) to *.json files
         */
        "i18n",

        /**
         * Compiles app/_assets/sass/.. to app/_assets/css/..
         * app.css, vendor.css are hardcoded links in index
         * Component SASS (our app feature styles) is being imported in app/_assets/sass/app.scss
         * Vendor CSS and SASS can be wiredep with bower:sass and bower:css inside app/_assets/sass/vendor.scss
         */
        "sass:prod",

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
         * Tasks need to be included to be run; (e.g. concat)
         */
        "useminPrepare",

        /**
         * Runs concat:generated from useminPrepare
         * Creates .tmp folder with concat files
         * Currently .tmp/concat/_assets/css (app.css, vendor.css) and /js (vendor.js)
         */
        "concat",

        /**
         * Compresses images from app/_assets/img to build/_assets/img
         */
        "imagemin",

        /**
         * Creates build/app.js from _assets/components/
         * Concat all components to single file. This solves many other issues (e.g. no lazy-load, no bundling)
         */
        "ngAnnotate:prod",

        // Replaces the index.html build blocks and updates the assets references
        "usemin",

        "jshint",
        "jscs",
        "sasslint",

        /**
         * Copy concat files ./tmp/concat/_assets (currently only js files - vendor.js) to build/_assets dir
         * Copy app asset files from app/_assets/.. (except of bower components - serve static) to build/_assets dir
         * Needs to be before uglify - otherwise it overwrites it
         */
        "copy:prod",

        // Uglify app.js and vendor.js
        "uglify:prod",

        // Unit test
        "test:unit"
    ]);
};
