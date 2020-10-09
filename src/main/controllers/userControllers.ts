import Debug from 'debug';
import { MyCasesPage } from '../models/myCasesPage';
import { Request, Response } from 'express';

const debug = Debug('app:route:signOut');
const stages = require('../data/stages');
export function signOut(req: Request,res: Response): void {
  debug('signOut router...');
  req.session.destroy(() => {debug('You are logged out');
    res.render('my-cases', {
      stages: new MyCasesPage('my-cases', stages).stages,
    });
  });
}
