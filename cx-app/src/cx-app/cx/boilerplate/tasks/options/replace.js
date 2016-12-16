module.exports = {
    bowerForDev: {
        options: {
            patterns: [
                {
                    // private bower registery setting used by CI
                    match: /\$\{private_bower_registery_base_url\}/g,
                    // replacement could be brought from sentinel-platform/pom.xml or .bowerrc
                    // for now it's just hard-coded here
                    replacement: "https://secmgmtgit.provo.novell.com:8443/scm"
                }
            ]
        },
        files: [
            {src: "bower.json", dest: "bower.json"},
            {src: "bower-shrinkwrap.json", dest: "bower-shrinkwrap.json"}
        ]
    },
    revertBowerForDev: {
        options: {
            patterns: [
                {
                    // private bower registery setting used by CI
                    match: /https:\/\/secmgmtgit.provo.novell.com:8443\/scm/g,
                    // replacement could be brought from sentinel-platform/pom.xml or .bowerrc
                    // for now it's just hard-coded here
                    replacement: "${private_bower_registery_base_url}"
                }
            ]
        },
        files: [
            {src: "bower.json", dest: "bower.json"},
            {src: "bower-shrinkwrap.json", dest: "bower-shrinkwrap.json"}
        ]
    },
    sortableNg: {
        options: {
            patterns: [
                {
                    usePrefix: false,
                    match: /"ng-sortable.js",/g,
                    replacement: "\"ng-sortable.js\""
                }
            ]
        },
        files: [
            {
                expand: true,
                flatten: true,
                src: "app/_assets/bower/Sortable/bower.json",
                dest: "app/_assets/bower/Sortable/"
            }
        ]
    },
    sortableKnockout: {
        options: {
            patterns: [
                {
                    usePrefix: false,
                    match: /"knockout-sortable.js",/g,
                    replacement: ""
                }
            ]
        },
        files: [
            {
                expand: true,
                flatten: true,
                src: "app/_assets/bower/Sortable/bower.json",
                dest: "app/_assets/bower/Sortable/"
            }
        ]
    },
    sortableReact: {
        options: {
            patterns: [
                {
                    usePrefix: false,
                    match: /"react-sortable-mixin.js"/g,
                    replacement: ""
                }
            ]
        },
        files: [
            {
                expand: true,
                flatten: true,
                src: "app/_assets/bower/Sortable/bower.json",
                dest: "app/_assets/bower/Sortable/"
            }
        ]
    }
};
