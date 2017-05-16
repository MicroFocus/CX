import { Express, Request, Response } from 'express';
import * as path from 'path';

/**
 * Provides a way to return mock data for URLs that would normally go to the middleware server.
 */
export function configureMockMiddleware(app: Express) {
    app.get('/api/registration/status', (req, res: Response) => {
        res.sendFile(path.join(__dirname, './mock-middleware-data/registration-status-response.json'));
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
}
