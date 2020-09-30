import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';

const createMyCaseWorkPageDebug = Debug('app:controller:myCaseWork:createMyCaseWorkPage');
const claimTaskDebug = Debug('app:controller:myCaseWork:claimTask');
const unClaimTaskDebug = Debug('app:controller:myCaseWork:unclaimTask');


export function createMyCaseWorkPage(req: Request, res: Response): void {
  createMyCaseWorkPageDebug('myCaseWork.createMyCaseWorkPage controller...');
  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myFilteredAvailableTasks,
      'addLocations': req.session.addLocations,
      'removeLocations': req.session.removeLocations,
    },
  });
}

export function claimTask(req: Request, res: Response): void {
  claimTaskDebug(`myCaseWork.claimTask controller with caseRef=${req.query.caseRef}...`);
  const filteredAvailableTasks: Array<Task> = req.session.myFilteredAvailableTasks;
  const myAvailableTasks: Array<Task> = req.session.myAvailableTasks;

  req.session.myTasks.push(myAvailableTasks.find(x => x.caseRef === req.query.caseRef));
  req.session.myFilteredAvailableTasks = filteredAvailableTasks.filter(x => x.caseRef !== req.query.caseRef);
  req.session.myAvailableTasks = myAvailableTasks.filter(x => x.caseRef !== req.query.caseRef);

  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myFilteredAvailableTasks,
      'addLocations': req.session.addLocations,
      'removeLocations': req.session.removeLocations,
    },
  });

}

export function unClaimTask(req: Request, res: Response): void {
  unClaimTaskDebug(`myCaseWork.unclaimTask controller with caseRef=${req.query.caseRef}...`);
  const actualMyTasks: Array<Task> = req.session.myTasks;
  const unclaimedTask: Task = actualMyTasks.find(task => task.caseRef === req.query.caseRef);

  req.session.myAvailableTasks.push(unclaimedTask);
  req.session.myFilteredAvailableTasks.push(unclaimedTask);
  req.session.myTasks = actualMyTasks.filter(x => x.caseRef !== req.query.caseRef);

  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myFilteredAvailableTasks,
      'addLocations': req.session.addLocations,
      'removeLocations': req.session.removeLocations,
    },
  });

}

