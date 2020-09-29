import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';
import { MyCaseWorkModel } from '../models/myCaseWorkModel';

const filterDebug = Debug('app:controller:filterTasksByLocations');

function filterGivenTaskListByLocations(taskList: Array<Task>, locations: Array<string>): Array<Task> {
  const newMyAvailableTasks: Array<Task> = [];
  locations.forEach(location => {
    const filteredList = taskList.filter(task => task.location === location);
    newMyAvailableTasks.push(...filteredList);
  });
  return newMyAvailableTasks;
}

function filterMyAvailableTasksByLocations(locations: string[]): Array<Task> {
  const model = new MyCaseWorkModel();
  const defaultMyAvailableTasks = model.getMyAvailableTasks;
  if (locations.length === 0) {
    return defaultMyAvailableTasks;
  }
  else {
    const newMyAvailableTasks: Array<Task> = filterGivenTaskListByLocations(defaultMyAvailableTasks, locations);
    return newMyAvailableTasks;
  }
}

export function filterTasksByLocationsController(req: Request, res: Response): void {
  filterDebug('filterTasksByLocations controller...');
  const locations: Array<string> = (Object as any).values(req.query); // eslint-disable-line @typescript-eslint/no-explicit-any
  filterDebug(`locations: ${JSON.stringify(locations)}`);

  req.session.myAvailableTasks = filterMyAvailableTasksByLocations(locations);

  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myAvailableTasks,
    },
  });
}

