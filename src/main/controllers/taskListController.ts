import { Request, Response } from 'express';
import Debug from 'debug';
import {Task} from '../models/task';

const debug = Debug('app:controller:taskListController');


export function createTaskListPage(req: Request, res: Response): void {
  debug('createTaskList controller...');
  req.session.myTasks = req.session.myTasks.sort((a: Task,b: Task) => a.dateOrder - b.dateOrder).reverse();
  req.session.myFilteredAvailableTasks = req.session.myFilteredAvailableTasks.sort((a: Task,b: Task) => a.dateOrder - b.dateOrder).reverse();
  req.session.myAvailableTasks = req.session.myAvailableTasks.sort((a: Task,b: Task) => a.dateOrder - b.dateOrder).reverse();

  res.render('task-list', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myFilteredAvailableTasks,
      'addLocations': req.session.addLocations,
      'removeLocations': req.session.removeLocations,
      'myChecked': { checked: true },
      'availableChecked': {},
      'myDisplay': 'block',
      'availableDisplay': 'none',
    },
  });
}

