module.exports = {
    options: {
        sourceMap: true,
        includePaths: ["bower"],
        outputStyle: "nested" //nested, expanded, compact, compressed
    },
    components: {
        options: {
            sourceMap: false,
            outputStyle: "compressed"
        },
        files: [{
            expand: true,
            cwd: "<%= cfg.paths.app %>/components",
            // scans just top level, include feature styles into app.scss
            src: [
                "**/*.scss"
            ],
            dest: "<%= cfg.paths.app %><%= cfg.paths.css %>",
            ext: ".css"
        }]
    },
    dev: {
        options: {
            outputStyle: "expanded"
        },
        files: [{
            expand: true,
            cwd: "<%= cfg.paths.app %><%= cfg.paths.sass %>",
            // scans just top level, include feature styles into app.scss
            src: [
                "*.scss"
            ],
            dest: "<%= cfg.paths.app %><%= cfg.paths.css %>",
            ext: ".css"
        }]
    },
    prod: {
        options: {
            sourceMap: true,
            outputStyle: "compressed"
        },
        files: [{
            expand: true,
            cwd: "<%= cfg.paths.app %><%= cfg.paths.sass %>",
            // scans just top level, include feature styles into app.scss
            src: [
                "*.scss"
            ],
            dest: "<%= cfg.paths.app %><%= cfg.paths.css %>",
            ext: ".css"
        }]
    },
    theme: {
        options: {
            sourceMap: false,
            includePaths: ["bower"],
            outputStyle: "compressed"
        },
        files: [{
            expand: true,
            cwd: "<%= cfg.paths.theme %>",
            // scans just top level, include feature styles into app.scss
            src: [
                "*.scss"
            ],
            dest: "<%= cfg.paths.theme %>",
            ext: ".css"
        }]
    }
};
