import {Server, Config} from 'karma';
import {argv} from 'yargs';
import {karmaConfig} from '../karma.conf';
import * as chalk from 'chalk';

karmaConfig.singleRun = !argv.watch;

console.log(chalk.green('Running unit tests using Webpack and Karma...\n'));

if (karmaConfig.singleRun) {
    console.log(chalk.yellow("If you'd like tests to be run continuously, you should run the following command:"));
    console.log(chalk.yellow("$ npm run test:watch\n"));
}

let server = new Server(karmaConfig, (exitCode) => {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
});

server.start();
