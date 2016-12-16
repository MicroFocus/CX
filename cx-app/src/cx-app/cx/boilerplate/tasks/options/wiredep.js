module.exports = {
    options: {},
    // https://github.com/taptapship/wiredep#configuration

    jade: {
        src: ["<%= cfg.paths.app %>/index.jade"],
        options: {
            cwd: "",
            dependencies: true,
            devDependencies: false,
            exclude: [],
            fileTypes: {
                jade: {
                    replace: {
                        js: "script(src=\"{{filePath}}\")",
                        css: "link(rel=\"stylesheet\", href=\"{{filePath}}\")"
                    }
                }
            },
            ignorePath: "",
            overrides: {}
        }
    },
    html: {
        ignorePath: /^\/|\.\.\//,
        src: ["<%= cfg.paths.build %>/index.html"]
    },
    sass: {
        src: ["<%= cfg.paths.app %>{,*/}*.scss"],
        ignorePath: /(\.\.\/){1,2}bower\//
    },
    karma: {
        src: ["<%= cfg.paths.test %>/karma.conf.js"],
        options: {
            cwd: "",
            dependencies: true,
            devDependencies: true,
            exclude: [],
            ignorePath: /\.\.\//g,
            fileTypes: {
                js: {
                    block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                    detect: {
                        js: /\"(.*\.js)\"/gi
                    },
                    replace: {
                        js: "\"{{filePath}}\","
                    }
                }
            }
        }
    }
};
