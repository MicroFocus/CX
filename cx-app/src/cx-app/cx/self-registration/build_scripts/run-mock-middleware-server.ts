/**
 * Runs the express web server, and either serves the files statically from the dist folder, or dynamically using
 * webpack, depending on whether or not the "--use-webpack" flag is supplied as an argument to this script.
 */

import * as express from 'express';
import * as chalk from 'chalk';
import * as path from 'path';
import * as cors from 'cors';

import { Express, Request, Response } from 'express';

const port = 80;
const app: Express = express();

let pwCounter = 1;

app.use(cors());

app.get('/api/registration/randompassword', (req, res: Response) => {
    res.send('random-' + pwCounter++);
});

app.get('/api/registration/randompassword_n', (req: Request, res: Response) => {
    const num: number = Number(req.query.num);
    const passwordList: string[] = [];

    for (let i = 1; i <= num; i++) {
        passwordList.push('random-' + i);
    }

    res.json({
        "passwords": passwordList
    });
});

app.get('/api/registration/status', (req, res: Response) => {
    res.sendFile(path.join(__dirname, './mock-middleware-server/registration-status-response.json'));
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(chalk.green(`Express web server listening on port: ${port}\n`));
    }
});
