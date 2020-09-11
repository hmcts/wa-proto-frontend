import { Response } from 'express';
import { createMyCaseWorkPage, claimTask, unClaimTask } from '../../../main/controllers/myCaseWork';


jest.mock('../../../main/models/task');

describe('myCaseWork controller', () => {

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  beforeEach(() => {
    req = {
      session: {
        myTasks: [{}],
        myAvailableTasks: [{}],

      },
    };

    res.render = jest.fn();

  });

  test('createMyCaseWorkPage method', () => {

    createMyCaseWorkPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-case-work', {
      'tasks': {
        'myAvailableTasks': [{}],
        'myTasks': [{}],
      },
    });
  });

  test('claimTask method', () => {

    req = (
      {
        query: {
          caseRef: '3',
        },
        session: {
          myTasks: [{ caseRef: '1' }, { caseRef: '2' }],
          myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
        },
        /* eslint-disable  @typescript-eslint/no-explicit-any */
      } as any);

    claimTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-case-work', {
      tasks: {
        myAvailableTasks: [{ caseRef: '4' }],
        myTasks: [{ caseRef: '1' }, { caseRef: '2' }, { caseRef: '3' }],
      },
    });
  });
  
  describe('unClaimTask method', () => {

    test('unClaim existing task', () => {

      req = (
        {
          query: {
            caseRef: '2',
          },
          session: {
            myTasks: [{ caseRef: '1' }, { caseRef: '2' }],
            myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
          },
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any);

      unClaimTask(req, res);

      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith('my-case-work', {
        tasks: {
          myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }, { caseRef: '2' }],
          myTasks: [{ caseRef: '1' }],
        },
      });
    });

    test('unClaim non-existing task', () => {

      req = (
        {
          query: {
            caseRef: '6',
          },
          session: {
            myTasks: [{ caseRef: '1' }, { caseRef: '2' }],
            myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
          },
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any);

      unClaimTask(req, res);

      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith('my-case-work', {
        tasks: {
          myTasks: [{ caseRef: '1' }, { caseRef: '2' }],
          myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
        },
      });
    });

  });


});
