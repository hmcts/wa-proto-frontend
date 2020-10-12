import { Request, Response } from 'express';
import Debug from 'debug';
import { Task } from '../models/task';
import { MyModel } from '../models/myModel';
import { taskDateOrderUtils } from '../utils/order-date-utils';
import { createTaskManagerPage } from '../controllers/taskManagerController';

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
  taskDateOrderUtils(req);
  const { locations, caseworkers } = req.body;

  if (caseworkers && locations) {
    req.session.myTasks = req.session.myTasks.filter((i: Task) => i.caseRef !== req.query.caseRef);
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
export function postReassignTaskAndGoToTaskManager(req: Request, res: Response): void {
  debugReassignTask(`postReassignTaskAndGoToTaskManager controller with caseRef=${req.query.caseRef}...`);
  const { locations, caseworkers } = req.body;

  if (caseworkers && locations) {
    req.session.myAvailableTasks = req.session.myAvailableTasks.map((task: Task) => {
      if (task.caseRef === req.query.caseRef) {
        task.caseworker = caseworkers;
        task.location = locations;
        return task;
      } else {
        return task;
      }
    });
  }
  req.query = {};
  createTaskManagerPage(req, res);
}
