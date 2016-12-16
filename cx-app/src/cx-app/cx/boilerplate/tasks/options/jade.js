module.exports = {
    default: {
        options: {
            pretty: true,
            data: {
                debug: true
            },
            doctype: "html"
        },
        files: [{
            expand: true,
            cwd: "app",
            src: [
                "index.jade",
                "**/*.jade"
            ],
            dest: "<%= cfg.paths.build %>",
            ext: ".html"
        }]
    }
};
