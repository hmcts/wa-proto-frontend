import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from '../models/task';
import { MyModel } from '../models/myModel';

const debugReassignTask = Debug('app:controller:reassignTask');

export function reassignTask(req: Request, res: Response): void {
  debugReassignTask(`reassignTask controller with caseRef=${req.query.caseRef}...`);
  const locations = MyModel.getAllLocations();
  const caseworker = MyModel.getAllCaseworker();
  let taskList: Array<Task> = null;

  if (req.query.tasksType === 'myManagerTasks') {
    taskList = req.session.myAvailableTasks;
  } else {
    taskList = req.session.myTasks;
  }

  const task = taskList.filter(i => i.caseRef === req.query.caseRef);

  res.render('reassign-task', {
    'task': task,
    'locations': locations,
    'caseworker': caseworker,
    'tasksType': req.query.tasksType,
  });

}

export function postReassignTask(req: Request, res: Response): void {
  debugReassignTask(`postReassignTask controller with caseRef=${req.query.caseRef}...`);
  let taskList: Array<Task> = null;
  const myTasks: Array<Task> = req.session.myTasks;
  if (req.query.tasksType === 'myManagerTasks') {
    taskList = req.session.myAvailableTasks;
  } else {
    taskList = req.session.myTasks;
  }

  const task = taskList.filter((i: Task) => i.caseRef === req.query.caseRef);
  const { locations, caseworkers } = req.body;
  const newList = taskList.filter((i: Task) => i.caseRef !== req.query.caseRef);

  if(req.query.tasksType === 'myManagerTasks') {
    newList.push(task[0]);
    req.session.myAvailableTasks = newList;
  } else {
    req.session.myTasks = newList;
  }

  if(req.query.tasksType !== 'myManagerTasks') {
    if (!caseworkers && !locations) {
      req.session.myTasks = myTasks;
    } else {
      req.session.myTasks = newList;
    }
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
