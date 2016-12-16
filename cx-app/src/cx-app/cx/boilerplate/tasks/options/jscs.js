module.exports = {
    src: ["<%= cfg.paths.app %>/**/*.js", "<%= cfg.paths.tasks %>/**/*.js"],
    options: {
        config: ".jscsrc",
        excludeFiles: ["node_modules", "./<%= cfg.paths.app %><%= cfg.paths.bower %>/**", "./app/components/widgets/faqs/angular-marked.js"],
        force: "<%= cfg.env.linters.continueOnError %>",
        maxErrors: "<%= cfg.env.linters.maxErrors %>"
    }
};
