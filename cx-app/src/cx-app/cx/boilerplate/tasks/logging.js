var logfile = require("logfile-grunt");
module.exports = function (grunt) {
    "use strict";
    grunt.option("stack", true);
    grunt.task.registerTask("logging:dev", "Keep appending everything to a log file.", function () {
        logfile(grunt, {
            filePath: "./logs/grunt-dev.txt",
            clearLogFile: false
        });
    });
    grunt.task.registerTask("logging:prod", "Keep appending everything to a log file.", function () {
        logfile(grunt, {
            filePath: "./logs/grunt-prod.txt",
            clearLogFile: false
        });
    });
    grunt.task.registerTask("logging:dist", "Keep appending everything to a log file.", function () {
        logfile(grunt, {
            filePath: "./logs/grunt-dist.txt",
            clearLogFile: false
        });
    });
};
