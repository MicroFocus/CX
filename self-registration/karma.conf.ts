import {devConfig, outputOptions} from './webpack.config';
import * as DefinePlugin from 'webpack/lib/DefinePlugin';

export const karmaConfig = {
    basePath: '',
    frameworks: ['mocha', 'chai'],

    files: [
        'src/polyfills.ts',
        'src/vendor.ts',
        'src/main.ts',

        'test/**/*.test.ts'
    ],

    exclude: [],

    preprocessors: {
        'src/**/*.ts': ['webpack'],
        'test/**/*.ts': ['webpack']
    },

    webpack: {
        resolve: devConfig.resolve,
        module: devConfig.module,

        plugins: [
            // NOTE: when adding more properties, make sure you include them in globals.d.ts
            new DefinePlugin({
                ENV: JSON.stringify("development")
            })
        ]
    },

    webpackMiddleware: {
//        noInfo: true,
        stats: outputOptions
    },

    mime: {
        "text/x-typescript": ["ts", "tsx"]
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: this.LOG_INFO,
    autoWatch: true,
    browsers: ['jsdom'], // Chrome, Firfox, PhantomJS, jsdom
    singleRun: true,
    concurrency: Infinity
};
