import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from '../models/task';
import { MyCasesPage } from '../models/myCasesPage';

const stages = require('../data/stages');
const debugCompleteTask = Debug('app:controller:completeTask');

export function completeTask(req: Request, res: Response): void {
  debugCompleteTask(`completeTask controller with caseRef=${req.params.caseRef}...`);
  req.session.myTasks = req.session.myTasks.filter((task: Task) => task.caseRef !== req.params.caseRef);
  res.render('my-cases', {
    stages: new MyCasesPage('my-cases', stages).stages,
  });
}

