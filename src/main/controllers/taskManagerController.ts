import { Request, Response } from 'express';
import Debug from 'debug';
import { MyModel } from '../models/myModel';

const debug = Debug('app:controller:taskManagerController');

function getLocationsForDropDownMenu(selectedLocation: string): Array<{}> {
  return MyModel.getAllLocations().map(l => {
    if (selectedLocation === l.name) {
      return {
        text: l.name,
        selected: true,
      };
    } else {
      return {
        text: l.name,
      };
    }
  });
}

function getCaseWorkersForDropDownMenu(): Array<{}> {
  return MyModel.getAllCaseworker().map(cw => {
    return {
      text: cw.name,
    };
  });

}

export function createTaskManagerPage(req: Request, res: Response): void {
  debug('createTaskManagerPage controller...');

  res.render('task-manager', {
    tasks: {
      myAvailableTasks: req.session.myAvailableTasks,
    },
    locations: getLocationsForDropDownMenu('Taylor House'),
    caseWorkers: [
      {
        text: 'All',
      },
      ...getCaseWorkersForDropDownMenu(),
      {
        text: 'Unassigned',
      },
    ],
  });
}


