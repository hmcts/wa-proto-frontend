import { Request, Response } from 'express';
import Debug from 'debug';

const debug = Debug('app:controller:myCaseWork');

export function createMyCaseWorkPage(req: Request, res: Response): void {
  debug('myCaseWork controller...');
  res.render('my-case-work');
}
