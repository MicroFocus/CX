module.exports = {
    options: {
        // Location of your protractor config file
        configFile: "test/protractor.conf.js",

        // Do you want the output to use fun colors?
        noColor: false,

        // Set to true if you would like to use the Protractor command line debugging tool
        debug: false,

        // Additional arguments that are passed to the webdriver command
        args: { },

        // install/update selenium driver
        webdriverManagerUpdate: true
    },
    e2e: {
        options: {
            // Stops Grunt process if a test fails
            keepAlive: true,
            configFile: "test/protractor.conf.js"
        }
    }
};
