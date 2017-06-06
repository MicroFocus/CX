import * as npmRunScript from 'npm-run-script';
import * as chalk from 'chalk';

import {argv} from 'yargs';

let testFiles: string[] = argv._;
if (testFiles === undefined || testFiles.length === 0) {
    console.log(chalk.yellow("This command should be run with a file pattern, such as:"));
    console.log(chalk.yellow("$ npm run test:mocha ./test/**/*.test.ts\n"));
    console.log(chalk.yellow("The purpose of this command is to run simple unit tests that don't require webpack or a dom.  If you want to run a test needing those, then you should run one of the following commands:"));
    console.log(chalk.yellow("$ npm test"));
    console.log(chalk.yellow("$ npm test:watch"));
    console.log(chalk.yellow(""));
} else {
    console.log(chalk.green('Running unit tests directly using Mocha (not using Webpack or Karma)...'));
    npmRunScript(`ts-mocha ${testFiles.join(' ')}`);
}
