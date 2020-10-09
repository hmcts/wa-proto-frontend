import { Request, Response } from 'express';
import Debug from 'debug';
import { getLocationsForDropDownMenu, getCaseWorkersForDropDownMenu } from '../services/taskManagerService';

const debug = Debug('app:controller:taskManagerController');

export function createTaskManagerPage(req: Request, res: Response): void {
  debug('createTaskManagerPage controller...');

  res.render('task-manager', {
    tasks: {
      myAvailableTasks: req.session.myAvailableTasks,
    },
    locations: getLocationsForDropDownMenu('Taylor House'),
    caseWorkers: getCaseWorkersForDropDownMenu('Bisa Butler'),
  });
}


