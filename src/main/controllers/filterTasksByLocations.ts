import { Request, Response } from 'express';
import Debug from 'debug';
import { MyCaseWorkModel as model } from '../models/myCaseWorkModel';
import {taskDateOrderUtils} from '../utils/order-date-utils';

const filterDebug = Debug('app:controller:filterTasksByLocations');

export function filterTasksByLocations(req: Request, res: Response): void {
  filterDebug('filterTasksByLocations controller...');
  const locations: Array<string> = (Object as any).values(req.query); // eslint-disable-line @typescript-eslint/no-explicit-any

  req.session.myFilteredAvailableTasks = (locations.length === 0) ? req.session.myAvailableTasks :
    req.session.myAvailableTasks.filter((x: { location: string }) => locations.includes(x.location));

  req.session.addLocations = model.getAllLocations().filter(x => !locations.includes(x.name));
  req.session.removeLocations = model.getAllLocations().filter(x => locations.includes(x.name));
  taskDateOrderUtils(req);
  res.render('task-list', {
    tasks: {
      myTasks: {
        taskList: req.session.myTasks,
        checked: { checked: true },
        display: 'block',
      },
      myAvailableTasks: {
        taskList: req.session.myAvailableTasks,
        checked: {},
        display: 'none',
      },
      filter: {
        addLocations: req.session.addLocations,
        removeLocations: req.session.removeLocations,
      },
    },
  });
}

