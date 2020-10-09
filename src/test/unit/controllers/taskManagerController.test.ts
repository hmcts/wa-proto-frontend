import { Response } from 'express';
import { createTaskManagerPage } from '../../../main/controllers/taskManagerController';
import { Task } from '../../../main/models/task';

describe('taskManager controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  const task = new Task('1549-6338-2756-6773', 'Lala Joji', 'Human', 'Taylor House', 'Review respondent evidence', 'Today', 3, 'today', 'Amanda Mc Donald');

  beforeEach(() => {

    res.render = jest.fn();

    req = {
      session: {
        myAvailableTasks: [task],
      },
    };

  });

  test('createTaskManagerPage method', () => {

    createTaskManagerPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-manager', {
      tasks: {
        myAvailableTasks: [task],
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
        },
        {
          selected: true,
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
