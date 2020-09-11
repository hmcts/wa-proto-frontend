import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';

const createMyCaseWorkPageDebug = Debug('app:controller:myCaseWork:createMyCaseWorkPage');
const claimTaskDebug = Debug('app:controller:myCaseWork:claimTask');


export function createMyCaseWorkPage(req: Request, res: Response): void {
  createMyCaseWorkPageDebug('myCaseWork.createMyCaseWorkPage controller...');
  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
    },
  });
}

function udpateSessionTasks(claimedTask: Task, actualMyAvailableTasks: Task[], req: Request): void {
  if (claimedTask) {
    claimTaskDebug(`claimedTask: ${JSON.stringify(claimedTask)}`);
    const newMyAvailableTasks: Array<Task> = actualMyAvailableTasks.filter(task => task.caseRef != req.query.caseRef);

    req.session.myAvailableTasks = newMyAvailableTasks;
    req.session.myTasks.push(claimedTask);
    claimTaskDebug(`req.session.myAvailableTasks: ${JSON.stringify(req.session.myAvailableTasks)}`);
    claimTaskDebug(`req.session.myTasks: ${JSON.stringify(req.session.myTasks)}`);
  }
}

export function claimTask(req: Request, res: Response): void {
  claimTaskDebug(`myCaseWork.claimTask controller with caseRef=${req.query.caseRef}...`);
  const actualMyAvailableTasks: Array<Task> = req.session.myAvailableTasks;
  const claimedTask: Task = actualMyAvailableTasks.find(task => task.caseRef === req.query.caseRef);

  udpateSessionTasks(claimedTask, actualMyAvailableTasks, req);

  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
    },
  });

}

