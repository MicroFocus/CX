module.exports = {
    options: {
        dest: "<%= cfg.paths.build %>"  //Base directory where the transformed files should be output.
    },
    // copying index.html to dist and running wiredep and usemin prepared from dist
    // - adds complexity, without much benefit (how much collision is between running dev and build?)
    // - will need to have index.html usemin blocks marked up differently from 'app/index.html'
    html: "<%= cfg.paths.build %>/index.html"
};
