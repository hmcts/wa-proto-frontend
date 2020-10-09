import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';
import { Location } from 'models/location';
import {taskDateOrderUtils} from '../utils/order-date-utils';

const unClaimTaskDebug = Debug('app:controller:unclaimTask');

export function unClaimTask(req: Request, res: Response): void {
  unClaimTaskDebug(`myCaseWork.unclaimTask controller with caseRef=${req.query.caseRef}...`);
  const actualMyTasks: Array<Task> = req.session.myTasks;
  const unclaimedTask: Task = actualMyTasks.find(task => task.caseRef === req.query.caseRef);

  if (unclaimedTask) {
    req.session.myAvailableTasks.push(unclaimedTask);
    const removeLocations: Array<Location> = req.session.removeLocations;
    if (removeLocations.length === 0 || removeLocations.find(x => x.name === unclaimedTask.location)) {
      req.session.myFilteredAvailableTasks.push(unclaimedTask);
    }
    req.session.myTasks = actualMyTasks.filter(x => x.caseRef !== req.query.caseRef);
  }
  taskDateOrderUtils(req);
  res.render('task-list', {
    tasks: {
      myTasks: {
        taskList: req.session.myTasks,
        checked: { checked: true },
        display: 'block',
      },
      myAvailableTasks: {
        taskList: req.session.myFilteredAvailableTasks,
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

