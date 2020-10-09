import { Request, Response } from 'express';
import Debug from 'debug';
import { getLocationsForDropDownMenu, getCaseWorkersForDropDownMenu } from '../services/taskManagerService';
import { taskDateOrderUtils } from '../utils/order-date-utils';
import { Task } from '../models/task';

const debug = Debug('app:controller:taskManagerController');

export function createTaskManagerPage(req: Request, res: Response): void {
  debug('createTaskManagerPage controller...');
  taskDateOrderUtils(req);

  const defaultLocation = req.session.taskManager.defaultLocation;
  const defaultCaseworker = req.session.taskManager.defaultCaseworker;

  let filteredManagerTasks = req.session.myAvailableTasks.filter((task: Task) => task.location === defaultLocation);
  if (defaultCaseworker !== 'All' && defaultCaseworker !== 'Unassigned') {
    filteredManagerTasks = filteredManagerTasks.filter((task: Task) => task.caseworker === defaultCaseworker);
  }

  res.render('task-manager', {
    tasks: {
      myAvailableTasks: filteredManagerTasks,
    },
    locations: getLocationsForDropDownMenu(defaultLocation),
    caseWorkers: getCaseWorkersForDropDownMenu(defaultCaseworker),
  });
}


