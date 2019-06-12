var gulp = require('gulp');
var ngGulp = require('@microfocus/ng-gulp');
var path = require('path');

var cwd = process.cwd();

ngGulp(gulp, {
    devServerPort: 8080,
    externals: {
        'angular-ui-router': 'window["angular-ui-router"]'
    },
    files: {
        indexProduction: 'src/index.production.html',
        vendorDevelopment: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
            'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css',
            'node_modules/font-awesome/css/font-awesome.css'
        ],
        vendorProduction: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
            'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css',
            'node_modules/font-awesome/css/font-awesome.css'
        ],
        vendorTest: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/jquery/dist/jquery.js'
        ]
    }
});

//
// Define some of our own additional tasks
//

gulp.task('copy:font-awesome', function() {
    return gulp
        .src(path.resolve(cwd, 'node_modules/font-awesome/fonts/**/*'))
        .pipe(gulp.dest(path.resolve(cwd, 'dist/fonts')));
});

gulp.task('copy:extras', ['copy:font-awesome']);

// Ensure copy:extras is a part of the copy:development & copy:production base tasks:
gulp.tasks['copy:development'].dep.push('copy:extras');
gulp.tasks['copy:production'].dep.push('copy:extras');
