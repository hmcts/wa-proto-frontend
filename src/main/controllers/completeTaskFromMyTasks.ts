import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';


const debugCompleteTask = Debug('app:controller:myCaseWork:completeTask');

export function completeTask(req: Request, res: Response): void {
  debugCompleteTask(`myCaseWork.completeTask controller with caseRef=${req.params.caseRef}...`);
  req.session.myTasks = req.session.myTasks.filter((task: Task) => task.caseRef !== req.params.caseRef);
  res.redirect('/');
}

