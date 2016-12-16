module.exports = {
    devlocal: ["<%= cfg.paths.app %>/**/*.js", "!<%= cfg.paths.app %><%= cfg.paths.bower %>/**/*.js", "!app/components/widgets/faqs/angular-marked.js"]
};
