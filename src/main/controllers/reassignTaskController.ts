import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from '../models/task';
import { MyModel } from '../models/myModel';

const debugReassignTask = Debug('app:controller:reassignTask');

export function reassignTask(req: Request, res: Response): void {
  debugReassignTask(`reassignTask controller with caseRef=${req.query.caseRef}...`);
  const myTasks: Array<Task> = req.session.myTasks;
  const task = myTasks.filter( i => i.caseRef === req.query.caseRef);
  const locations = MyModel.getAllLocations();
  const caseworker = MyModel.getAllCaseworker();

  res.render('reassign-task', {
    'task': task,
    'locations': locations,
    'caseworker': caseworker,
  });

}

export function postReassignTask(req: Request, res: Response): void {
  debugReassignTask(`postReassignTask controller with caseRef=${req.query.caseRef}...`);
  const myTasks: Array<Task> = req.session.myTasks;

  const {locations, caseworkers} = req.body;
  const NewList = myTasks.filter((i: Task) => i.caseRef !== req.query.caseRef);

  if(!caseworkers && !locations) {
    req.session.myTasks = myTasks;
  } else {
    req.session.myTasks = NewList;
  }

  res.render('task-list', {
    tasks: {
      myTasks: {
        taskList: req.session.myTasks,
        checked: { checked: true },
        display: 'block',
      },
      myAvailableTasks: {
        taskList: req.session.myFilteredAvailableTasks,
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
