module.exports = function (grunt) {
    "use strict";

    var glob = require("glob");
    var config = {
        cfg: grunt.file.readJSON("config.json"),
        pkg: grunt.file.readJSON("package.json")
    };

    require("time-grunt")(grunt);

    // Get all task options from `tasks/options` folder, keep the matching the task name / option name:
    grunt.util._.extend(config, loadConfig("./tasks/options/"));

    grunt.initConfig(config);

    // ======== TASK LOADING ========

    // Load tasks defined in the `tasks` folder
    grunt.loadTasks("tasks");

    // Parse `package.json` dependencies (matching the `grunt-*` pattern) and auto-load all grunt tasks
    require("load-grunt-tasks")(grunt);

    // ======== DEFAULT TASK(S) ========

    grunt.registerTask("default", ["dist"]);

    // ======== UTILS ========

    /**
     * Utility to load task option files
     *
     * @param path
     * @returns {{}}
     */
    function loadConfig (path) {
        var glob = require("glob");
        var object = {};
        var key;

        glob.sync("*", {cwd: path}).forEach(function (option) {
            key = option.replace(/\.js$/, "");
            // watch out for camelcase tasks, their options file has to be camelcase
            object[key] = require(path + option);
        });

        return object;
    }

};
