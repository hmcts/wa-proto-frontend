import { Response } from 'express';
import { claimTask } from '../../../main/controllers/claimTaskController';

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

  });

  test('claimTask method', () => {
    req.query.complete = 'false';
    req.query.caseRef = '3';
    claimTask(req, res);


    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: [{ caseRef: '3' }, { caseRef: '2' }, { caseRef: '1' }],
          checked: { },
          display: 'none',
        },
        myAvailableTasks: {
          taskList: [{ caseRef: '4' }],
          checked: { checked: true },
          display: 'block',
        },
        filter: {
          addLocations: [
            {
              index: 1,
              name: 'Birmingham',
            },
          ],
          removeLocations: [],
        },
      },
    });
  });

  test('claimTask and complete method', () => {
    const stages = require('../../../main/data/stages');

    req.query.complete = 'true';
    req.query.caseRef = '3';
    claimTask(req, res);

    expect(req.session.myFilteredAvailableTasks.length).toEqual(1);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-cases', {
      stages: stages,
    });
  });

});
