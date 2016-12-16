module.exports = {
    updateSelenium: {
        command: "./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update",
        stdout: false,
        stderr: false
    },
    startSelenium: {
        command: "./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager start",
        stdout: true,
        stderr: true
    }
};
