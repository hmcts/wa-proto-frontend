import { Response } from 'express';
import { createTaskListPage } from '../../../main/controllers/taskListController';

describe('taskList controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  beforeEach(() => {

    req = {
      session: {
        myTasks: [{ location: 'Birmingham' }],
        myAvailableTasks: [{ location: 'Taylor House' }],
        myFilteredAvailableTasks: [{ location: 'Taylor House' }],
        addLocations: [{
          index: 1,
          name: 'Birmingham',
        },
        {
          index: 2,
          name: 'Bradford',
        }],
        removeLocations: [{
          index: 3,
          name: 'Tayloer House',
        }],
      },
    };

    res.render = jest.fn();

  });

  test('createTaskListPage method', () => {

    createTaskListPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myAvailableTasks: [{ location: 'Taylor House' }],
        myTasks: [{ location: 'Birmingham' }],
        addLocations: [{
          index: 1,
          name: 'Birmingham',
        },
        {
          index: 2,
          name: 'Bradford',
        }],
        removeLocations: [{
          index: 3,
          name: 'Tayloer House',
        }],
      },
    });
  });

});
