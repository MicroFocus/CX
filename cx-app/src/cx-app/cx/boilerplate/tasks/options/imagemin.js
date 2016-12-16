module.exports = {
    dynamic: {
        files: [
            {
                expand: true,
                cwd: "<%= cfg.paths.app %>",
                src: ["**/*.{png,jpg,gif}"],
                dest: "<%= cfg.paths.build %>"
            }
        ]
    }
};
