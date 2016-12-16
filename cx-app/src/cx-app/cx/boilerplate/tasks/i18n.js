module.exports = function(grunt) {
    "use strict";

    grunt.config.set("i18n", {
        extract: ["jade", "nggettext_extract"],
        compile: ["nggettext_compile"]
    });

    grunt.registerMultiTask("i18n", "Localization: Extract to POT and compile to JSON", function () {
        grunt.task.run(this.data)
    });

};
