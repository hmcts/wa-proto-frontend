import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from '../models/task';
import { MyCaseWorkModel } from '../models/myCaseWorkModel';

const debugReassignTask = Debug('app:controller:reassignTask');

export function reassignTask(req: Request, res: Response): void {
  debugReassignTask(`myCaseWork.claimTask controller with caseRef=${req.query.caseRef}...`);
  const myTasks: Array<Task> = req.session.myTasks;
  const task = myTasks.filter( i => i.caseRef === req.query.caseRef);
  const locations = MyCaseWorkModel.getAllLocations();
  const caseworker = MyCaseWorkModel.getAllCaseworker();

  res.render('reassign-task', {
    'task': task,
    'locations': locations,
    'caseworker': caseworker,
  });

}

export function postReassignTask(req: Request, res: Response): void {
  debugReassignTask(`myCaseWork.claimTask controller with caseRef=${req.query.caseRef}...`);
  const myTasks: Array<Task> = req.session.myTasks;

  const task = myTasks.filter((i: Task) => i.caseRef === req.query.caseRef);
  const {locations, caseworkers} = req.body;
  const NewList = myTasks.filter((i: Task) => i.caseRef !== req.query.caseRef);

  if (caseworkers) {
    task[0].caseworker = caseworkers;
  }
  if (locations) {
    task[0].location = locations;
  }
  NewList.push(task[0]);
  req.session.myTasks = NewList;


  res.render('task-list', {
    tasks: {
      'myTasks': req.session.myTasks,
      'myAvailableTasks': req.session.myFilteredAvailableTasks,
      'addLocations': req.session.addLocations,
      'removeLocations': req.session.removeLocations,
    },

  });
}
