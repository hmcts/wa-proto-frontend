import { Request, Response } from 'express';
import { Task } from '../models/task';
import Debug from 'debug';

const debug = Debug('app:controller:myCaseWork');

const myAvailableTasks = function getMyAvailableTasks(): Array<Task> {
  const myAvailableTasks: Array<Task> = [];

  const task1 = new Task('1549 6338 2756 6773', 'Lala Joji', 'Human', 'Taylor House', 'Review respondent evidence', 'Today');
  const task2 = new Task('1549 9061 9513 0004', 'Nonasky Pecki', 'EEA', 'Taylor House', 'Create case summary', '04 Dec');
  const task3 = new Task('1549 9083 5480 6960', 'Wauanda Jik', 'Human Rights', 'Taylor House', 'Review appellant case', '+2 days');

  myAvailableTasks.push(task1);
  myAvailableTasks.push(task2);
  myAvailableTasks.push(task3);

  return myAvailableTasks;
};

const myTasks = function getMyTasks(): Array<Task> {
  const myTasks: Array<Task> = [];

  const task1 = new Task('1549 4765 3206 5586', 'Kili Muso', 'Protection', 'Taylor House', 'Review respondent evidence', 'Today');
  const task2 = new Task('1549 5366 1108 0150', 'Mankay Lit', 'Revocation', 'Taylor House', 'Review appellant case', '04 Dec');
  const task3 = new Task('1549 2345 7854 9786', 'Wina Palic', 'Human Rights', 'Taylor House', 'Review respondent evidence', '+2 days');

  myTasks.push(task1);
  myTasks.push(task2);
  myTasks.push(task3);

  return myTasks;
};


export function createMyCaseWorkPage(req: Request, res: Response): void {
  debug('myCaseWork controller...');

  res.render('my-case-work', {
    tasks: {
      'myTasks': myTasks,
      'myAvailableTasks': myAvailableTasks,
    },
  });
}

