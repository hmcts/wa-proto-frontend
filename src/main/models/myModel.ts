import { Task } from '../models/task';
import { Location } from '../models/location';
import { Caseworker } from '../models/caseworker';

const task0 = new Task('1549-6338-2756-6773', 'Lala Joji', 'Human', 'Taylor House', 'Review respondent evidence', 'Today', 3, 'today','Amanda Mc Donald');
const task1 = new Task('1549-2353-5684-8902', 'Rachel Smith', 'Human', 'Birmingham', 'Review respondent evidence', 'Today', 3, 'today','Bisa Butler');
const task2 = new Task('1549-9061-9513-0004', 'Nonasky Pecki', 'EEA', 'Taylor House', 'Create case summary', '04 Dec', 2, 'future','Amanda Mc Donald');
const task3 = new Task('1549-9083-5480-6960', 'Wauanda Jik', 'Human Rights', 'Taylor House', 'Review appellant case', '+2 days', 4, 'past','Bisa Butler');
const task4 = new Task('1549-4765-3206-5586', 'Kili Muso', 'Protection', 'Taylor House', 'Review respondent evidence', 'Today', 3, 'today','Amanda Mc Donald');
const task5 = new Task('1549-5366-1108-0150', 'Mankay Lit', 'Revocation', 'Taylor House', 'Review appellant case', '14 Dec', 1, 'future','Simone Harley');
const task6 = new Task('1549-2345-7854-9786', 'Wina Palic', 'Human Rights', 'Taylor House', 'Review respondent evidence', '+4 days', 5, 'past','Simone Harley');

export class MyModel {

  static getMyAvailableTasks(): Array<Task> {
    const tasks: Array<Task> = [];

    tasks.push(task0);
    tasks.push(task1);
    tasks.push(task2);
    tasks.push(task3);

    return tasks;
  }

  static getMyFilteredAvailableTasks(): Array<Task> {
    const tasks: Array<Task> = [];

    tasks.push(task0);
    tasks.push(task2);
    tasks.push(task3);

    return tasks;
  }

  static getMyTasks(): Array<Task> {
    const tasks: Array<Task> = [];

    tasks.push(task4);
    tasks.push(task5);
    tasks.push(task6);

    return tasks;

  }

  static getAllLocations(): Array<Location> {
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

    ];
  }

  static getRemoveLocations(): Array<Location> {
    return [
      {
        name: 'Taylor House',
        index: 8,
      },
    ];
  }

  static getAllCaseworker(): Array<Caseworker> {
    return [
      {
        name: 'Bisa Butler',
        index: 0,
      },
      {
        name: 'Amanda Mc Donald',
        index: 1,
      },
      {
        name: 'Simone Harley',
        index: 2,
      },
    ];

  }

}
