module.exports = {
    options: {
        // Task-specific options go here.
        singleQuotes: false
    },
    dev: {
        files: {
            "build/app.js": [
                "app/app.module.js",
                "app/**/*.module.js",
                "app/*.js",
                "app/**/*.js",
                "!app/**/*spec.js",
                "!app/_assets/bower/**/*.js"
            ]
        }
    },
    prod: {
        files: {
            "build/app.js": [
                "app/app.module.js",
                "app/**/*.module.js",
                "app/*.js",
                "app/**/*.js",
                "!app/**/*spec.js",
                "!app/_assets/bower/**/*.js"
            ]
        }
    },
    dist: {
        files: {
            "build/app.js": [
                "app/app.module.js",
                "app/**/*.module.js",
                "app/*.js",
                "app/**/*.js",
                "!app/**/*spec.js",
                "!app/_assets/bower/**/*.js"
            ]
        }
    }
};
