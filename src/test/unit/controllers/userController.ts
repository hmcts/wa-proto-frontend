import { Response } from 'express';
import { signOut } from '../../../main/controllers/userControllers';

describe('claimTask controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  beforeEach(() => {

    req = (
      {
        query: {
        },
        session: {
          myTasks: [{ caseRef: '1' }, { caseRef: '2' }],
          myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
          myFilteredAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
          addLocations: [
            {
              index: 1,
              name: 'Birmingham',
            },
          ],
          removeLocations: [],
        },
        /* eslint-disable  @typescript-eslint/no-explicit-any */
      } as any);

    res.render = jest.fn();
    req.session.destroy = jest
      .fn()
      .mockImplementation((fn) => fn(true));

  });

  test('sign out', () => {
    const stages = require('../../../main/data/stages');

    signOut(req, res);

    expect(req.session.myFilteredAvailableTasks.length).toEqual(2);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(req.session.destroy).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-cases', {
      stages: stages,
    });
  });

});
