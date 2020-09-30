import { Request, Response } from 'express';
import Debug from 'debug';
import { MyCaseWorkModel as model } from '../models/myCaseWorkModel';

const filterDebug = Debug('app:controller:filterTasksByLocations');

export function filterTasksByLocationsController(req: Request, res: Response): void {
  filterDebug('filterTasksByLocations controller...');
  const locations: Array<string> = (Object as any).values(req.query); // eslint-disable-line @typescript-eslint/no-explicit-any

  req.session.myFilteredAvailableTasks = (locations.length === 0) ? req.session.myAvailableTasks :
    req.session.myAvailableTasks.filter((x: { location: string }) => locations.includes(x.location));

  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myFilteredAvailableTasks,
      'addLocations': model.getAddLocations.filter(x => !locations.includes(x.name)),
      'removeLocations': model.getAddLocations.filter(x => locations.includes(x.name)),
    },
  });
}

