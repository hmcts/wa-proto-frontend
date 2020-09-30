import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';
import { MyCaseWorkModel as model } from '../models/myCaseWorkModel';

const createMyCaseWorkPageDebug = Debug('app:controller:myCaseWork:createMyCaseWorkPage');
const claimTaskDebug = Debug('app:controller:myCaseWork:claimTask');
const unClaimTaskDebug = Debug('app:controller:myCaseWork:unclaimTask');


export function createMyCaseWorkPage(req: Request, res: Response): void {
  createMyCaseWorkPageDebug('myCaseWork.createMyCaseWorkPage controller...');
  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
      'addLocations': model.getAddLocations(),
      'removeLocations': model.getRemoveLocations(),
    },
  });
}

function udpateSessionTasksForClaimedTask(claimedTask: Task, actualMyAvailableTasks: Task[], req: Request): void {
  if (claimedTask) {
    claimTaskDebug(`claimedTask: ${JSON.stringify(claimedTask)}`);
    const newMyAvailableTasks: Array<Task> = actualMyAvailableTasks.filter(task => task.caseRef !== req.query.caseRef);

    req.session.myAvailableTasks = newMyAvailableTasks;
    req.session.myTasks.push(claimedTask);
    claimTaskDebug(`req.session.myAvailableTasks: ${JSON.stringify(req.session.myAvailableTasks)}`);
    claimTaskDebug(`req.session.myTasks: ${JSON.stringify(req.session.myTasks)}`);
  }
}

function udpateSessionTasksForUnClaimedTask(unClaimedTask: Task, actualMyTasks: Task[], req: Request): void {
  if (unClaimedTask) {
    unClaimTaskDebug(`unClaimedTask: ${JSON.stringify(unClaimedTask)}`);
    const newMyTasks: Array<Task> = actualMyTasks.filter(task => task.caseRef !== req.query.caseRef);

    req.session.myTasks = newMyTasks;
    req.session.myAvailableTasks.push(unClaimedTask);
    unClaimTaskDebug(`req.session.myAvailableTasks: ${JSON.stringify(req.session.myAvailableTasks)}`);
    unClaimTaskDebug(`req.session.myTasks: ${JSON.stringify(req.session.myTasks)}`);
  }
}

export function claimTask(req: Request, res: Response): void {
  claimTaskDebug(`myCaseWork.claimTask controller with caseRef=${req.query.caseRef}...`);
  const actualMyAvailableTasks: Array<Task> = req.session.myAvailableTasks;
  const claimedTask: Task = actualMyAvailableTasks.find(task => task.caseRef === req.query.caseRef);

  udpateSessionTasksForClaimedTask(claimedTask, actualMyAvailableTasks, req);

  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
      'addLocations': model.getAddLocations(),
      'removeLocations': model.getRemoveLocations(),
    },
  });

}

export function unClaimTask(req: Request, res: Response): void {
  unClaimTaskDebug(`myCaseWork.unclaimTask controller with caseRef=${req.query.caseRef}...`);
  const actualMyTasks: Array<Task> = req.session.myTasks;
  const unclaimedTask: Task = actualMyTasks.find(task => task.caseRef === req.query.caseRef);

  udpateSessionTasksForUnClaimedTask(unclaimedTask, actualMyTasks, req);

  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
      'addLocations': model.getAddLocations(),
      'removeLocations': model.getRemoveLocations(),
    },
  });

}

