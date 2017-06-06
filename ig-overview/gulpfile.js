var gulp = require('gulp');
var ngGulp = require('ng-gulp');

ngGulp(gulp, {
    externals: {
        'angular-material': 'window["angular-material"]',
        'angular-ui-router': 'window["angular-ui-router"]'
    },
    files: {
        indexProduction: 'src/index.production.html',
        vendorDevelopment: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-ui-router/release/angular-ui-router.js'
        ],
        vendorProduction: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-ui-router/release/angular-ui-router.js'
        ],
        vendorTest: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-ui-router/release/angular-ui-router.js'
        ]
    }
});
