import { Response } from 'express';
import { filterTasksByLocations } from '../../../main/controllers/filterTasksByLocations';
import { MyModel as model } from '../../../main/models/myModel';

describe('filterTasksByLocations controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  beforeEach(() => {

    req = {
      query: {
        item0: 'Birmingham',
      },
      session: {
        myTasks: [{}],
        myAvailableTasks: [
          { location: 'Birmingham' },
          { location: 'Bradford' },
        ],
      },
    };

    res.render = jest.fn();

    jest.spyOn(model, 'getAllLocations').mockReturnValue([
      {
        'index': 1,
        'name': 'Birmingham',
      },
      {
        'index': 2,
        'name': 'Bradford',
      },
    ]);

  });

  test('filterTasksByLocations method', () => {

    filterTasksByLocations(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: [{}],
          checked: {checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: [{ location: 'Bradford' },{location: 'Birmingham'}],
          checked: {  },
          display: 'none',
        },
        filter: {
          addLocations: [
            {
              index: 2,
              name: 'Bradford',
            },
          ],
          removeLocations: [
            {
              index: 1,
              name: 'Birmingham',
            },
          ],
        },
      },
    });
  });
});
