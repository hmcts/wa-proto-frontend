import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from 'models/task';

const filterDebug = Debug('app:controller:filterTasksByLocations');

function filterGivenTaskListByLocations(taskList: Array<Task>, locations: Array<string>): Array<Task> {
  const newMyAvailableTasks: Array<Task> = [];
  locations.forEach(location => {
    const filteredList = taskList.filter(task => task.location === location);
    newMyAvailableTasks.push(...filteredList);
  });
  return newMyAvailableTasks;
}

export function filterTasksByLocationsController(req: Request, res: Response): void {
  filterDebug('filterTasksByLocations controller...');
  const locations: Array<string> = (Object as any).values(req.query); // eslint-disable-line @typescript-eslint/no-explicit-any
  filterDebug(`locations: ${JSON.stringify(locations)}`);

  req.session.myFilteredAvailableTasks = (locations.length === 0) ? req.session.myAvailableTasks :
    filterGivenTaskListByLocations(req.session.myAvailableTasks, locations);

  res.render('my-case-work', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myFilteredAvailableTasks,
    },
  });
}

