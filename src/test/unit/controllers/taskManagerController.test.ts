import { Response } from 'express';
import { createTaskManagerPage } from '../../../main/controllers/taskManagerController';
import { Task } from '../../../main/models/task';

const task1 = new Task('1549-6338-2756-6773', 'Lala Joji', 'Human', 'Taylor House', 'Review respondent evidence', 'Today', 3, 'today', 'Amanda Mc Donald');
const task2 = new Task('1549-5366-1108-0150', 'Mankay Lit', 'Revocation', 'Taylor House', 'Review appellant case', '14 Dec', 3, 'future', 'Simone Harley');
const task3 = new Task('1549-3567-7832-9735', 'Gracie-May Houston', 'EEA', 'Manchester', 'Review respondent evidence', '14 Dec', 3, 'future', 'Amanda Mc Donald');

const scenarios = [
  {
    session: {
      myAvailableTasks: [task1, task2, task3],
      myTasks: [task1],
      myFilteredAvailableTasks: [task1],
      taskManager: {
        selectedLocation: 'Taylor House',
        selectedCaseworker: 'All',
      },
      query: {},
    },
  },
];

describe.each(scenarios)('taskManager controller', (session) => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const req = session as any;
  const res = {} as Response;
  res.render = jest.fn();

  test('filter task manager tasks by ', () => {

    createTaskManagerPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-manager', {
      tasks: {
        myAvailableTasks: [task2, task1],
      },
      locations: [
        {
          text: 'Birmingham',
        },
        {
          text: 'Bradford',
        },
        {
          text: 'Glasgow',
        },
        {
          text: 'Hatton Cross',
        },
        {
          text: 'Manchester',
        },
        {
          text: 'Newcastle',
        },
        {
          text: 'Newport',
        },
        {
          text: 'Taylor House',
          selected: true,
        },
      ],
      caseWorkers: [
        {
          text: 'All',
          selected: true,
        },
        {
          text: 'Bisa Butler',
        },
        {
          text: 'Amanda Mc Donald',
        },
        {
          text: 'Simone Harley',
        },
        {
          text: 'Unassigned',
        },
      ],
    });
  });

});
