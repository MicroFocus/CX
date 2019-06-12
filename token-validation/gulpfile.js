var gulp = require('gulp');
var ngGulp = require('@microfocus/ng-gulp');
var gulpConnect = require('gulp-connect');
var path = require('path');

var cwd = process.cwd();
ngGulp(gulp, {
    disableLiveReload: true,
    devServerPort: 8080,
    externals: {
        'angular-material': 'window["angular-material"]',
        'angular-ui-router': 'window["angular-ui-router"]',
        '@microfocus/ng-ias': 'window["ng-ias"]'
    },
    files: {
        indexProduction: 'src/index.production.html',
        vendorDevelopment: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/@microfocus/ng-ias/dist/ng-ias.js',
            'node_modules/@microfocus/ng-ias/dist/ng-ias.css',
            'node_modules/ias-icons/dist/ias-icons.css',
            'node_modules/ias-icons/dist/**/*',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/js-cookie/src/js.cookie.js'
        ],
        vendorProduction: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/@microfocus/ng-ias/dist/ng-ias.js',
            'node_modules/@microfocus/ng-ias/dist/ng-ias.css',
            'node_modules/ias-icons/dist/ias-icons.css',
            'node_modules/ias-icons/dist/**/*',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/js-cookie/src/js.cookie.js'
        ],
        vendorTest: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/js-cookie/src/js.cookie.js'
        ]
    }
});

//
// Define some of our own additional tasks
//

gulp.task('copy:gromit', function() {
    return gulp
        .src(path.resolve(cwd, 'node_modules/unjar-from-url/node_modules/gromit/**/*'))
        .pipe(gulp.dest(path.resolve(cwd, 'dist/gromit')));
});

gulp.task('copy:oauth', function() {
    return gulp
        .src(path.resolve(cwd, 'node_modules/unjar-from-url/node_modules/gromit/html/oauth.html'))
        .pipe(gulp.dest(path.resolve(cwd, 'dist/')));
});

var fs = require('fs');
var replace = require('gulp-replace');

gulp.task('inject-gromit-settings', [], function () {
    if (fs.existsSync('dist/index.html')) {
        fs.unlinkSync('dist/index.html');
    }
    gulp.src(['src/index.html'])
        .pipe(replace('// Gromit config goes here', function() {
            return fs.readFileSync('src/oauth.config', 'utf8');
        }))
    .pipe(gulp.dest('dist/'));
});

gulp.tasks['default'].dep.push('copy:gromit');
gulp.tasks['default'].dep.push('copy:oauth');
