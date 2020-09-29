import Debug from 'debug';
import { tasks } from '../data/myCaseWorkData';
import { Task } from '../models/task';

const debug = Debug('app:model:myCaseWorkModel');

export class MyCaseWorkModel {

  private myAvailableTasks: Array<Task> = [];
  private myTasks: Array<Task> = [];

  constructor() {
    debug('MyCaseWorkModel created...');
    this.myAvailableTasks.push(tasks[0]);
    this.myAvailableTasks.push(tasks[1]);
    this.myAvailableTasks.push(tasks[2]);
    this.myAvailableTasks.push(tasks[3]);

    this.myTasks.push(tasks[4]);
    this.myTasks.push(tasks[5]);
    this.myTasks.push(tasks[6]);
  }

  get getMyAvailableTasks(): Array<Task> {
    return this.myAvailableTasks;
  }

  get getMyTasks(): Array<Task> {
    return this.myTasks;
  }

}
