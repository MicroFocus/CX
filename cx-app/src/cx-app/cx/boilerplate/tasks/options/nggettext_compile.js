module.exports = {
    // temporary to be able to debug locally (inside i18n folder) - not from dist version
    devlocal: {
        options: {
            format: "json"
        },
        files: [{
            expand: true,
            src: "<%= cfg.paths.i18n %>/*.po",
            dest: "",
            ext: ".json"
        }]
    },
    // creates build/i18n folder
    dist: {
        options: {
            format: "json"
        },
        files: [{
            expand: true,
            src: "<%= cfg.paths.i18n %>/*.po",
            dest: "<%= cfg.paths.build %>",
            ext: ".json"
        }]
    }
};
