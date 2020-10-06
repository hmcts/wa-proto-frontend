import {Request, Response} from 'express';
import Debug from 'debug';
import {Task} from '../models/task';

const debug = Debug('app:controller:taskListController');


export function createTaskListPage(req: Request, res: Response): void {
  const removeMyTasksByCase = (): string => {
    req.session.myTasks = req.session.myTasks.filter((task: Task) => task.caseRef !== '1549 4765 3206 5586');
    return '/';
  };

  const redirectTasks = (): string => {
    return '/';
  };

  debug('createTaskList controller...');
  res.render('task-list', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myFilteredAvailableTasks,
      'addLocations': req.session.addLocations,
      'removeLocations': req.session.removeLocations,
      removeMyTasksByCase,
      redirectTasks,
    },
  });
}

