import { Task } from '../models/task';
import { Location } from '../models/location';
import { Caseworker } from '../models/caseworker';

const task5 = new Task('1549-5366-1108-0150', 'Mankay Lit', 'Revocation', 'Taylor House', 'Review appellant case', '14 Dec', 3, 'future', 'Simone Harley');
const task2 = new Task('1549-9061-9513-0004', 'Nonasky Pecki', 'EEA', 'Taylor House', 'Create case summary', '04 Dec', 4, 'future', 'Amanda Mc Donald');
const task16 = new Task('1549-3567-7832-9735', 'Gracie-May Houston', 'EEA', 'Manchester', 'Review respondent evidence', '14 Dec', 3, 'future', 'Amanda Mc Donald');
const task19 = new Task('1549-2345-7845-9723', 'Ellouise Wagstaff', 'Human', 'Newport', 'Review appellant case', '7 Nov', 5, 'future', 'Simone Harley');
const task20 = new Task('1549-2345-7833-9739', 'Griff Oakley', 'Human', 'Newport', 'Review appellant case', '5 Sept', 6, 'future', 'Bisa Butler');
const task21 = new Task('1549-2345-7822-9778', 'May Lin', 'Revocation', 'Newport', 'Review appellant case', '29 Dec', 1, 'future', 'Simone Harley');
const task0 = new Task('1549-6338-2756-6773', 'Lala Joji', 'Human', 'Taylor House', 'Review respondent evidence', 'Today', 7, 'today', 'Amanda Mc Donald');
const task1 = new Task('1549-2353-5684-8902', 'Rachel Smith', 'Human', 'Birmingham', 'Review respondent evidence', 'Today', 7, 'today', 'Bisa Butler');
const task14 = new Task('1549-7765-9863-9738', 'Roxy Sanchez', 'Human', 'Hatton Cross', 'Review respondent evidence', 'Today', 7, 'today', 'Amanda Mc Donald');
const task15 = new Task('1549-4664-7864-9734', 'Kameron Khan', 'Human', 'Manchester', 'Review respondent evidence', 'Today', 7, 'today', 'Bisa Butler');
const task17 = new Task('1549-2345-7854-9733', 'Raveena Lucero', 'Human', 'Newcastle', 'Review respondent evidence', 'Today', 7, 'today', 'Simone Harley');
const task7 = new Task('1549-2334-7823-0000', 'Madihah Knott', 'Protection', 'Birmingham', 'Create case summary', 'Today', 7, 'today', 'Amanda Mc Donald');
const task8 = new Task('1549-6554-7542-9787', 'Fergus Bender', 'Revocation', 'Newcastle', 'Create case summary', 'Today', 7, 'today', 'Amanda Mc Donald');
const task11 = new Task('1549-2654-5653-9743', 'Karishma O\'Reilly', 'Human', 'Glasgow', 'Review appellant case', 'Today', 7, 'today', 'Simone Harley');
const task4 = new Task('1549-4765-3206-5586', 'Kili Muso', 'Protection', 'Taylor House', 'Review respondent evidence', 'Today', 7, 'today', 'Amanda Mc Donald');
const task6 = new Task('1549-2345-7854-9786', 'Wina Palic', 'Human Rights', 'Taylor House', 'Review respondent evidence', '+4 days', 9, 'past', 'Simone Harley');
const task9 = new Task('1549-2333-7832-9799', 'Hana Li', 'Human', 'Bradford', 'Create case summary', '+5 days', 10, 'past', 'Simone Harley');
const task10 = new Task('1549-2643-9865-9765', 'Natalia Rahman', 'EEA', 'Bradford', 'Review appellant case', '+8 days', 11, 'past', 'Amanda Mc Donald');
const task12 = new Task('1549-2245-2345-9745', 'Phebe Tanner', 'Revocation', 'Glasgow', 'Review appellant case', '+10 days', 12, 'past', 'Amanda Mc Donald');
const task13 = new Task('1549-6534-7532-9771', 'Johnny Hickman', 'EEA', 'Hatton Cross', 'Review appellant case', '+5 days', 10, 'past', 'Simone Harley');
const task22 = new Task('1549-2345-7834-9756', 'Max Carter', 'Protection', 'Newport', 'Review appellant case', '+3 days', 8, 'past', 'Bisa Butler');
const task18 = new Task('1549-2345-7888-9721', 'Penny Palacios', 'Protection', 'Newcastle', 'Review appellant case', '+4 days', 9, 'past', 'Amanda Mc Donald');
const task23 = new Task('1234-2345-7888-9721', 'Jack Bishop', 'Protection', 'Newcastle', 'Review appellant case', '+4 days', 9, 'past', 'Unassigned');


export class MyModel {

  static getMyAvailableTasksFilteredByOptionalLocationAndCaseworker(location?: string, caseworker?: string): Array<Task> {
    let filteredTasks = this.getMyAvailableTasks();
    if (location !== 'All') {
      filteredTasks = filteredTasks.filter((task: Task) => task.location === location);
    }
    if (caseworker !== 'All') {
      filteredTasks = filteredTasks.filter((task: Task) => task.caseworker === caseworker);
    }
    return filteredTasks;
  }

  static getMyAvailableTasks(): Array<Task> {
    const tasks: Array<Task> = [];

    tasks.push(task0);
    tasks.push(task1);
    tasks.push(task2);
    tasks.push(task7);
    tasks.push(task22);
    tasks.push(task18);
    tasks.push(task10);
    tasks.push(task15);
    tasks.push(task11);
    tasks.push(task13);
    tasks.push(task12);
    tasks.push(task17);
    tasks.push(task19);
    tasks.push(task20);
    tasks.push(task16);
    tasks.push(task9);
    tasks.push(task8);
    tasks.push(task21);
    tasks.push(task14);
    tasks.push(task23);

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
