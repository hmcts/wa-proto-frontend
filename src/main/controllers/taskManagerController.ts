import { Request, Response } from 'express';
import Debug from 'debug';
import { MyModel } from '../models/myModel';

const debug = Debug('app:controller:taskManagerController');

function getLocationsForDropDownMenu(selectedOption: string): Array<{}> {
  return MyModel.getAllLocations().map(l => {
    if (selectedOption === l.name) {
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

function getCaseWorkersForDropDownMenu(selectedOption: string): Array<{}> {

  const allCaseWorkers = MyModel.getAllCaseworker().map(cw => {
    return {
      text: cw.name,
    };
  });

  const allOptions = [
    {
      text: 'All',
    },
    ...allCaseWorkers,
    {
      text: 'Unassigned',
    },
  ];

  return allOptions.map(o => {
    if (o.text === selectedOption) {
      return {
        text: o.text,
        selected: true,
      };
    } else return {
      text: o.text,
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
    caseWorkers: getCaseWorkersForDropDownMenu('Bisa Butler'),
  });
}


