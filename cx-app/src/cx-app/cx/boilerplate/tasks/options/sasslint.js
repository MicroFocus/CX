module.exports = {
    options: {
        configFile: ".sass-lint.yml",
        ignore: "<%= cfg.paths.app %><%= cfg.paths.sass %>/_globals/_mixins.scss"
    },
    target: [
        "<%= cfg.paths.app %><%= cfg.paths.assets %>/sass/**/*.scss"
    ]
};

