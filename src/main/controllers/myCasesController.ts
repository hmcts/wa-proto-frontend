import { Request, Response } from 'express';
import { MyCasesPage } from '../models/myCasesPage';
import Debug from 'debug';

const stages = require('../data/stages');
const debug = Debug('app:controller:myCases');

export function createMyCasesPage(req: Request, res: Response): void {
  debug('myCases controller...');
  res.render('my-cases', {
    stages: new MyCasesPage('my-cases', stages).stages,
  });
}
