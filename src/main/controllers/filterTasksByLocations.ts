import { Request, Response } from 'express';
import Debug from 'debug';
import { MyCaseWorkModel as model } from '../models/myCaseWorkModel';
import {Task} from '../models/task';

const filterDebug = Debug('app:controller:filterTasksByLocations');

export function filterTasksByLocations(req: Request, res: Response): void {
  filterDebug('filterTasksByLocations controller...');
  const locations: Array<string> = (Object as any).values(req.query); // eslint-disable-line @typescript-eslint/no-explicit-any

  req.session.myFilteredAvailableTasks = (locations.length === 0) ? req.session.myAvailableTasks :
    req.session.myAvailableTasks.filter((x: { location: string }) => locations.includes(x.location));

  req.session.addLocations = model.getAllLocations().filter(x => !locations.includes(x.name));
  req.session.removeLocations = model.getAllLocations().filter(x => locations.includes(x.name));
  req.session.myTasks = req.session.myTasks.sort((a: Task,b: Task) => a.dateOrder - b.dateOrder);

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

