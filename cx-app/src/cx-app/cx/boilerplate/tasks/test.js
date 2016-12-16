module.exports = function(grunt) {
    "use strict";

    grunt.config.set("test", {
        unit: ["wiredep:karma", "karma"],
        e2e: ["protractor:e2e"]
    });

    grunt.registerMultiTask("test", "Test: Run unit and end to end test", function () {
        grunt.task.run(this.data)
    });

};
