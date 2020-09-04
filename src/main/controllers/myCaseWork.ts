import { Request, Response } from 'express';
import { Task } from '../models/task';
import Debug from 'debug';

const debug = Debug('app:controller:myCaseWork');

export function createMyCaseWorkPage(req: Request, res: Response): void {
  debug('myCaseWork controller...');
  
  const tasks: Array<Task> = [];
  const task1 = new Task('1549 4765 3206 5586', 'Kili Muso', 'Protection', 'Taylor House', 'Review respondent evidence', 'Today');
  const task2 = new Task('1549 5366 1108 0150', 'Mankay Lit', 'Revocation', 'Taylor House', 'Review appellant case', '04 Dec');
  const task3 = new Task('1549 2345 7854 9786', 'Wina Palic', 'Human Rights', 'Taylor House', 'Review respondent evidence', '+2 days');

  tasks.push(task1);
  tasks.push(task2);
  tasks.push(task3);

  res.render('my-case-work', {tasks: tasks});
}
