import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';

const debug = Debug('app:controller:myCaseWork');


export function createMyCaseWorkPage(req: Request, res: Response): void {
  debug('myCaseWork.createMyCaseWorkPage controller...');
  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
    },
  });
}

export function claimTask(req: Request, res: Response): void {
  debug(`myCaseWork.claimTask controller with caseRef=${req.params.caseRef}...`);
  const presentMyAvailableTasks: Array<Task> = req.session.myAvailableTasks;
  const futureMyAvailableTasks: Array<Task> = presentMyAvailableTasks.filter(task => task.caseRef != req.params.caseRef);
  
  req.session.myAvailableTasks = futureMyAvailableTasks;
  
  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
    },
  });

}

