import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from '../models/task';
import { MyCasesPage } from '../models/myCasesPage';

const claimTaskDebug = Debug('app:controller:claimTask');
const stages = require('../data/stages');

export function claimTask(req: Request, res: Response): void {
  claimTaskDebug(`myCaseWork.claimTask controller with caseRef=${req.query.caseRef}...`);
  const filteredAvailableTasks: Array<Task> = req.session.myFilteredAvailableTasks;
  const myAvailableTasks: Array<Task> = req.session.myAvailableTasks;
  const complete = req.query.complete;
  if (complete === 'true') {
    req.session.myTasks = req.session.myTasks.filter((task: Task) => task.caseRef !== req.query.caseRef);
    req.session.myFilteredAvailableTasks = filteredAvailableTasks.filter(x => x.caseRef !== req.query.caseRef);
    req.session.myAvailableTasks = myAvailableTasks.filter(x => x.caseRef !== req.query.caseRef);

    res.render('my-cases', {
      stages: new MyCasesPage('my-cases', stages).stages,
    });
  } else if (complete === 'false') {
    req.session.myTasks.push(myAvailableTasks.find(x => x.caseRef === req.query.caseRef));
    req.session.myFilteredAvailableTasks = filteredAvailableTasks.filter(x => x.caseRef !== req.query.caseRef);
    req.session.myAvailableTasks = myAvailableTasks.filter(x => x.caseRef !== req.query.caseRef);

    res.render('task-list', {
      tasks: {
        'myTasks': req.session.myTasks,
        'myAvailableTasks': req.session.myFilteredAvailableTasks,
        'addLocations': req.session.addLocations,
        'removeLocations': req.session.removeLocations,
      },
    });
  }


}

