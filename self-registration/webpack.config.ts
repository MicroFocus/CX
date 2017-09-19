import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as WebpackMd5Hash from 'webpack-md5-hash';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as LiveReloadPlugin from 'webpack-livereload-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as DefinePlugin from 'webpack/lib/DefinePlugin';
import * as path from 'path';

import * as webpackGlobEntry from 'webpack-glob-entry';

export const outputOptions = {
    "chunks": false,
    "colors": true
};

/**
 * Configuration common to both development and production
 */
const commonConfig: webpack.Configuration = {
    target: 'web',
    entry: {
        polyfills: path.resolve(__dirname, 'src/polyfills'),
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/main'),
        portal: path.resolve(__dirname, 'src/portal')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    externals: {
    },
    resolve: {
        // Added '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style-loader',  'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /(index|portal)\.html$/
            },
            {   // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                test: /\.js$/,
                use: "source-map-loader",
                enforce: "pre",
                "exclude": [
                    /\/node_modules\//,
                    /\\node_modules\\/
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/assets', to: './assets'},
            {context: 'node_modules/@microfocus/ng-ias/dist', from: '*.css', to: './assets/ng-ias'}
        ]),

        // Use CommonsChunkPlugin to create a separate bundle
        // of vendor libraries so that they're cached separately.
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        })
    ]
};

/**
 * Configuration specific to development
 */
export const devConfig: webpack.Configuration = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',

    entry: {
//        tests: Object.values(webpackGlobEntry('./test/**/*.test.ts'))
    },

    plugins: [
        // Update the HTML file to inject a reference to our bundled JS
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency',
            inject: true,
            excludeChunks: ['tests', 'portal'],
            livereload: true
        }),

        // Update the HTML file to inject a reference to our bundled JS
        new HtmlWebpackPlugin({
            filename: 'portal.html',
            template: 'src/portal.html',
            chunksSortMode: 'dependency',
            inject: true,
            excludeChunks: ['tests', 'main'],
            livereload: true
        }),

        new CopyWebpackPlugin([
            {from: 'node_modules/mocha/mocha.*', to: 'assets/test/', flatten: true},
            {from: 'test/tests.html', to: './'}
        ]),

        // Cause the browser to reload whenever webpack rebuilds the output
        new LiveReloadPlugin(),

        // NOTE: when adding more properties, make sure you include them in globals.d.ts
        new DefinePlugin({
            ENV: JSON.stringify("development")
        })
    ]
});

/**
 * Configuration specific to production
 */
export const prodConfig: webpack.Configuration = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        // Override the filename to account for the chunks
        filename: '[name].[chunkhash].js',
        sourceMapFilename: '[name].[chunkhash].map'
    },
    plugins: [
        // Hash the files using MD5 so that their names change when the content changes.
        new WebpackMd5Hash(),

        // Create HTML file that includes reference to bundled JS
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            excludeChunks: ['tests', 'portal']
        }),

        // Create HTML file that includes reference to bundled JS
        new HtmlWebpackPlugin({
            filename: 'portal.html',
            template: 'src/portal.html',
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            excludeChunks: ['tests', 'main']
        }),

        // Eliminate duplicate packages when generating bundle
        //new webpack.optimize.DedupePlugin(),

        // Minify JS
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),

        // NOTE: when adding more properties, make sure you include them in globals.d.ts
        new DefinePlugin({
            ENV: JSON.stringify("production")
        })
    ]
});
