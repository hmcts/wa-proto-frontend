import { Request, Response } from 'express';
import Debug from 'debug';
import { getLocationsForDropDownMenu, getCaseWorkersForDropDownMenu } from '../services/taskManagerService';
import { taskDateOrderUtils } from '../utils/order-date-utils';
import { Task } from '../models/task';
import _ from 'lodash';

const debug = Debug('app:controller:taskManagerController');

export function createTaskManagerPage(req: Request, res: Response): void {
  debug(`createTaskManagerPage controller with query: ${JSON.stringify(req.query)}`);
  taskDateOrderUtils(req);

  if (!_.isEmpty(req.query)) {
    req.session.taskManager.selectedLocation = req.query.location;
    req.session.taskManager.selectedCaseworker = req.query.caseworker;
  }

  const selectedLocation = req.session.taskManager.selectedLocation;
  const selectedCaseworker = req.session.taskManager.selectedCaseworker;

  let filteredManagerTasks = req.session.myAvailableTasks.filter((task: Task) => task.location === selectedLocation);
  if (selectedCaseworker !== 'All') {
    filteredManagerTasks = filteredManagerTasks.filter((task: Task) => task.caseworker === selectedCaseworker);
  }

  res.render('task-manager', {
    tasks: {
      myAvailableTasks: filteredManagerTasks,
    },
    locations: getLocationsForDropDownMenu(selectedLocation),
    caseWorkers: getCaseWorkersForDropDownMenu(selectedCaseworker),
  });
}


