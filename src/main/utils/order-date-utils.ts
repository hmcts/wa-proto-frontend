import {Task} from '../models/task';
import { Request} from 'express';

const taskDateOrderUtils = (req: Request): void => {
  req.session.myTasks = req.session.myTasks.sort((a: Task,b: Task) => a.dateOrder - b.dateOrder).reverse();
  req.session.myFilteredAvailableTasks = req.session.myFilteredAvailableTasks.sort((a: Task,b: Task) => a.dateOrder - b.dateOrder).reverse();
  req.session.myAvailableTasks = req.session.myAvailableTasks.sort((a: Task,b: Task) => a.dateOrder - b.dateOrder).reverse();
};

export {
  taskDateOrderUtils,
};
