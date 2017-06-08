var gulp = require('gulp');
var ngGulp = require('ng-gulp');

ngGulp(gulp, {
    devServerPort: 8082,
    externals: {
        'angular-material': 'window["angular-material"]',
        'angular-ui-router': 'window["angular-ui-router"]',
        'ng-ias': 'window["ng-ias"]'
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
            'node_modules/ng-ias/dist/ng-ias.js',
            'node_modules/ng-ias/dist/ng-ias.css',
            'node_modules/ias-icons/dist/ias-icons.css',
            'node_modules/ias-icons/dist/**/*',
            'vendor/gromit/css/gromit-all-min.css',
            'vendor/gromit/js/gromit-all-min.js'
        ],
        vendorProduction: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/ng-ias/dist/ng-ias.js',
            'node_modules/ng-ias/dist/ng-ias.css',
            'node_modules/ias-icons/dist/ias-icons.css',
            'node_modules/ias-icons/dist/**/*',
            'vendor/gromit/css/gromit-all-min.css',
            'vendor/gromit/js/gromit-all-min.js'
        ],
        vendorTest: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/ng-ias/dist/ng-ias.js',
            'node_modules/ng-ias/dist/ng-ias.css'
        ]
    }
});
