import { Request, Response } from 'express';
import Debug from 'debug';
import {taskDateOrderUtils} from '../utils/order-date-utils';

const debug = Debug('app:controller:taskListController');


export function createTaskListPage(req: Request, res: Response): void {
  debug('createTaskList controller...');
  taskDateOrderUtils(req);
  res.render('task-list', {
    tasks: {
      myTasks: {
        taskList: req.session.myTasks,
        checked: { checked: true },
        display: 'block',
      },
      myAvailableTasks: {
        taskList: req.session.myAvailableTasks,
        checked: {},
        display: 'none',
      },
      filter: {
        addLocations: req.session.addLocations,
        removeLocations: req.session.removeLocations,
      },
    },
  });
}

