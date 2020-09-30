import { Response } from 'express';
import { filterTasksByLocations } from '../../../main/controllers/filterTasksByLocations';
import { MyCaseWorkModel as model } from '../../../main/models/myCaseWorkModel';

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

    jest.spyOn(model, 'getAddLocations').mockReturnValue([
      {
        'index': 1,
        'name': 'Birmingham',
      },
      {
        'index': 2,
        'name': 'Bradford',
      },
    ]);
    jest.spyOn(model, 'getRemoveLocations').mockReturnValue([]);

  });

  test('filterTasksByLocations method', () => {

    filterTasksByLocations(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-case-work', {
      tasks: {
        myAvailableTasks: [{ location: 'Birmingham' }],
        myTasks: [{}],
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
    });
  });


});
