import { Request, Response } from 'express';
import { Task } from '../models/task';
import Debug from 'debug';

const debug = Debug('app:controller:myCaseWork');

export function createMyCaseWorkPage(req: Request, res: Response): void {
  debug('myCaseWork controller...');
  const task = new Task('1');
  res.render('my-case-work', {task: task});
}
