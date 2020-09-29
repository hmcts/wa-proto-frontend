import { Request, Response } from 'express';
import Debug from 'debug';

const filterDebug = Debug('app:controller:filterTasksByLocations');

export function filterTasksByLocations(req: Request, res: Response): void {
  filterDebug('filterTasksByLocations controller...');
  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
    },
  });
}
