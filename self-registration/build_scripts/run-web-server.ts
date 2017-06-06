/**
 * Runs the express web server, and either serves the files statically from the dist folder, or dynamically using
 * webpack, depending on whether or not the "--use-webpack" flag is supplied as an argument to this script.
 */

import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as path from 'path';
import * as express from 'express';
import * as chalk from 'chalk';
import * as WebpackOptionsValidationError from 'webpack/lib/WebpackOptionsValidationError';

import { argv } from 'yargs';
import { configureMockMiddleware } from './mock-middleware';
import { Express, Request, Response } from 'express';
import { devConfig, outputOptions } from '../webpack.config';

const port = 8080;
const app: Express = express();

configureMockMiddleware(app);

// Dynamically serve assets using Webpack if --use-webpack flag is set
if (argv.useWebpack) {
    console.log(chalk.yellow("Dynamically loading assets using webpack...\n"));

    try {
        // Using webpack, so everything is dynamic
        const webpackCompiler: webpack.Compiler = webpack(webpackMerge(devConfig, {
            output: {
                // Change the output folder so we can run with all the assets "in-place", and since webpack-dev-middleware keeps
                // the bundle files in-memory, nothing gets written to disk.
                path: path.resolve(__dirname, 'src')
            }
        }));

        // Use webpack-dev-middleware to serve up whatever webpack produces
        app.use(webpackDevMiddleware(webpackCompiler, {
            publicPath: webpackCompiler.options.output.publicPath,
            stats: outputOptions,
            watchOptions: {
                poll: true
            }
        }));
    } catch (e) {
        console.log(chalk.red("An error has occurred while running Webpack:\n"));

        if (e instanceof WebpackOptionsValidationError) {
            console.log(e.message);
        } else {
            console.log(JSON.stringify(e));
        }

        throw e;
    }
} else {
    console.log(chalk.yellow("Statically loading files from ./dist...\n"));

    // Not using webpack, so just serve up everything statically under ./dist
    app.use(express.static('dist'));
}

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(chalk.green(`Express web server listening on port: ${port}\n`));
    }
});
