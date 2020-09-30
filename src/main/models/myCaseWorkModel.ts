import Debug from 'debug';
import { tasks } from '../data/myCaseWorkData';
import { Task } from '../models/task';
import { Location } from '../models/location';

const debug = Debug('app:model:myCaseWorkModel');

export class MyCaseWorkModel {

  private myAvailableTasks: Array<Task> = [];
  private myTasks: Array<Task> = [];

  constructor() {
    debug('MyCaseWorkModel created...');
    this.buildMyAvailableTasks();
    this.buildMyTasks();
  }

  private buildMyTasks(): void {
    this.myTasks.push(tasks[4]);
    this.myTasks.push(tasks[5]);
    this.myTasks.push(tasks[6]);
  }

  private buildMyAvailableTasks(): void {
    this.myAvailableTasks.push(tasks[0]);
    this.myAvailableTasks.push(tasks[1]);
    this.myAvailableTasks.push(tasks[2]);
    this.myAvailableTasks.push(tasks[3]);
  }

  get getMyAvailableTasks(): Array<Task> {
    return this.myAvailableTasks;
  }

  get getMyTasks(): Array<Task> {
    return this.myTasks;
  }

  static getAddLocations(): Array<Location> {
    return [
      {
        name: 'Birmingham',
        index: 1,
      },
      {
        name: 'Bradford',
        index: 2,
      },
      {
        name: 'Glasgow',
        index: 3,
      },
      {
        name: 'Hatton Cross',
        index: 4,
      },
      {
        name: 'Manchester',
        index: 5,
      },
      {
        name: 'Newcastle',
        index: 6,
      },
      {
        name: 'Newport',
        index: 7,
      },
      {
        name: 'Taylor House',
        index: 8,
      },
    ];
  }

  static getRemoveLocations(): Array<Location> {
    return [];
  }

}
