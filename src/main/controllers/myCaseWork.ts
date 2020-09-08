import { Request, Response } from 'express';
import Debug from 'debug';

const debug = Debug('app:controller:myCaseWork');


export function createMyCaseWorkPage(req: Request, res: Response): void {
  debug('myCaseWork.createMyCaseWorkPage controller...');
  console.log(`*** req.session: ${JSON.stringify(req.session)}`);
  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
    },
  });
}

export function claimTask(req: Request, res: Response): void {
  debug(`myCaseWork.claimTask controller with caseRef=${req.params.caseRef}...`);
  res.send(`claim task with caseRef=${req.params.caseRef}`);
}

