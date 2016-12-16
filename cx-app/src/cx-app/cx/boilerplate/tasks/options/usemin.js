module.exports = {
    options: {
        /**
         * List of directories where we should start to look for revved version of the assets referenced
         * in the currently looked at file, i.e. 'html' or 'css' files.
         * https://github.com/yeoman/grunt-usemin#assetsdirs
         */
        assetsDirs: [
            "<%= cfg.paths.build %>/components",
            "<%= cfg.paths.build %>/_assets/css"
        ]
    },
    html: ["<%= cfg.paths.build %>/{,*/}*.html"],
    css: ["<%= cfg.paths.build %>/_assets/css/{,*/}*.css"]
};
