(function() {
    var allFiles = [{
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.app %>",
        dest: "<%= cfg.paths.build %>",
        src: [
            "**/*.{ico,png,jpg,gif,html,css,json,md}",
            "!**/bower/**"
        ]
    }, {
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.tmp %>/concat/_assets/js/",
        dest: "<%= cfg.paths.build %>/_assets/js/",
        src: [
            "{,**/}*.js"
        ]
    }, {
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.app %>/concat/_assets/css/",
        dest: "<%= cfg.paths.build %>/_assets/css/",
        src: [
            "{,**/}*.css"
        ]
    }, {
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.app%>/_assets/samples/",
        dest: "<%= cfg.paths.build %>/_assets/samples/",
        src: [
            "{,**/}*"
        ]
    }, {
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.i18n %>",
        dest: "<%= cfg.paths.build %>/<%= cfg.paths.i18n %>",
        src: [
            "{,**/}*.json"
        ]
    }, {
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.app %>/<%= cfg.paths.bower %>/font-awesome/fonts/",
        dest: "<%= cfg.paths.build %>/<%= cfg.paths.assets %>/fonts/",
        src: [
            "{,**/}*.{otf,eot,svg,ttf,woff,woff2}"
        ]
    }, {
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.app %>/<%= cfg.paths.bower %>/angular-ui-grid/",
        dest: "<%= cfg.paths.build %>/_assets/css/",
        src: [
            "{,**/}*.{otf,eot,svg,ttf,woff,woff2}"
        ]
    }, {
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.app %>/<%= cfg.paths.fonts %>",
        dest: "<%= cfg.paths.build %>/<%= cfg.paths.fonts %>",
        src: [
            "{,**/}*.{otf,eot,svg,ttf,woff,woff2}"
        ]
    }];

    var sourceMaps = {
        expand: true,
        dot: false,
        cwd: "<%= cfg.paths.app %>",
        dest: "<%= cfg.paths.build %>",
        src: [
            "**/*.map",
            "!**/bower/**"
        ]
    };

    module.exports = {
        dev: {
            options: {
                noProcess: "app/_assets/bower"
            },
            files: allFiles
        },
        prod: {
            options: {
                noProcess: "app/_assets/bower"
            },
            files: allFiles.concat(sourceMaps)
        },
        dist: {
            options: {
                noProcess: "app/_assets/bower"
            },
            files: allFiles
        },
        devToServer: {
            files: [
                {
                    expand: true,
                    dot: false,
                    cwd: "build",
                    dest: "\\\\164.99.175.227\\webapp",
                    src: [
                        "**/*.{ico,png,jpg,gif,html,css,json,otf,eot,svg,ttf,woff,woff2}",
                        "!**/bower/**"
                    ]
                }
            ]
        },
        sourceHTML: {
            options: {
                noProcess: "app/_assets/bower"
            },
            files: [
                {
                    expand: true,
                    dot: false,
                    cwd: "<%= cfg.paths.app %>",
                    dest: "<%= cfg.paths.build %>",
                    src: [
                        "**/*.html",
                        "!**/bower/**"
                    ]
                }
            ]
        }
    };
}());
