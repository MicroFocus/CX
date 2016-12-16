module.exports = {
    prod: {
        options: {
            sourceMap: true,
            preserveComments: false,
            sourceMapIncludeSources: true,
            compress: {
                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers, disallowQuotedKeysInObjects
                drop_console: true,
                dead_code: true,
                global_defs: {
                    "DEBUG": false
                }
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers, disallowQuotedKeysInObjects
            },
            beautify: false
        },
        files: {
            "build/app.js": ["build/app.js"],
            "build/_assets/js/vendor.js": [".tmp/concat/_assets/js/vendor.js"]
        }
    },
    dist: {
        options: {
            sourceMap: false,
            preserveComments: false,
            sourceMapName: "build/app.js.map",
            compress: {
                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers, disallowQuotedKeysInObjects
                drop_console: true,
                dead_code: true,
                global_defs: {
                    "DEBUG": false
                }
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers, disallowQuotedKeysInObjects
            },
            beautify: false
        },
        files: {
            "build/app.js": ["build/app.js"],
            "build/_assets/js/vendor.js": [".tmp/concat/_assets/js/vendor.js"]
        }
    }
};

