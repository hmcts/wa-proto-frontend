import { Request, Response } from 'express';
import Debug from 'debug';

const debug = Debug('app:controller:taskManagerController');


export function createTaskManagerPage(req: Request, res: Response): void {
  debug('createTaskManagerPage controller...');
  res.render('task-manager');
}

