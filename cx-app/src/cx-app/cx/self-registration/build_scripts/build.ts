/**
 * Performs a build of the project, and outputs to the dist folder.  The output contains production optimizations unless
 * the "--develoment" flag is supplied as an argument to this script.
 */

import * as webpack from 'webpack';
import * as chalk from 'chalk';
import * as WebpackOptionsValidationError from 'webpack/lib/WebpackOptionsValidationError';

import {prodConfig, devConfig, outputOptions} from '../webpack.config';
import {argv} from 'yargs';

// Use dev configuration if the --development flag was set, otherwise use prod
const config: webpack.Configuration = argv.development ? devConfig : prodConfig;

if (argv.development) {
    console.log(chalk.blue("Performing a development build (no output optimizations)...\n"));
} else {
    console.log(chalk.blue("Performing a production build (with output optimizations)...\n"));
}

try {
    webpack(config).run((err: Error, stats: webpack.Stats) => {
        if (err) { // so a fatal error occurred.  Stop here.
            console.log(chalk.red(err.toString()));
            return 1;
        }

        const jsonStats = stats.toJson();

        if (jsonStats.hasErrors) {
            return jsonStats.errors.map(error => console.log(chalk.red(error)));
        }

        if (jsonStats.hasWarnings) {
            console.log(chalk.yellow('Webpack generated the following warnings: '));
            jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
        }

        console.log(stats.toString(outputOptions) + "\n");

        // if we got this far, the build succeeded.
        console.log(chalk.blue('Webpack build has has completed successfully!'));

        return 0;
    });
} catch (e) {
    console.log(chalk.red("An error has occurred while running Webpack:\n"));

    if (e instanceof WebpackOptionsValidationError) {
        console.log(e.message);
    } else {
        console.log(JSON.stringify(e));
    }
}
