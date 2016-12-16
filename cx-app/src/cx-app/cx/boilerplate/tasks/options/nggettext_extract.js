module.exports = {
    pot: {
        files: {
            "<%=cfg.paths.i18n%>/resources-locale_<%=cfg.paths.locale%>.pot": ["<%= cfg.paths.build %>/{,**/}*.html"]
        }
    }
};
