import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';
import { Location } from 'models/location';

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

