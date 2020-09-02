import { Request, Response } from 'express';
import { Page } from '../models/page';
import Debug from 'debug';

const stages = require('../data/stages');
const debug = Debug('app:controller');

export function createMyCasesPage(req: Request, res: Response): void {
  debug('myCases controller...');
  res.render('my-cases', {
    stages: new Page('my-cases', stages).stages,
  });
}
