
import { Response } from 'express';
import { unClaimTask } from '../../../main/controllers/unClaimTaskController';

describe('unClaimTask controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  beforeEach(() => {

    res.render = jest.fn();

  });

  const scenarios = [
    {
      caseRef: '2',
      expectedMyTask: [{caseRef: ('1')}],
      expectedMyAvailableTask: [{caseRef: '2', location: 'Birmingham'}, {caseRef: '3'}, {caseRef: '4'}],
    },
    {
      caseRef: '6',
      expectedMyTask: [{caseRef: '1'}, {caseRef: '2', location: 'Birmingham'}],
      expectedMyAvailableTask: [{caseRef: '3'}, {caseRef: '4'}],
    },
  ];
  describe('unclaimassign controller', () => {
    test(`unClaim task for caseRef=${scenarios[0].caseRef}`, () => {

      req = (
        {
          query: {
            caseRef: scenarios[0].caseRef,
          },
          session: {
            myTasks: [{caseRef: '2', location: 'Birmingham'}, {caseRef: '1'}],
            myAvailableTasks: [{caseRef: '4'}, {caseRef: '3'}],
            myFilteredAvailableTasks: [{caseRef: '4'}, {caseRef: '3'}],
            addLocations: [],
            removeLocations: [{
              index: 1,
              name: 'Birmingham',
            }],
          },
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any);

      unClaimTask(req, res);

      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith('task-list', {
        tasks: {
          myTasks: {
            taskList: scenarios[0].expectedMyTask,
            checked: {checked: true},
            display: 'block',
          },
          myAvailableTasks: {
            taskList: scenarios[0].expectedMyAvailableTask,
            checked: {},
            display: 'none',
          },
          filter: {
            addLocations: [],
            removeLocations: [{
              index: 1,
              name: 'Birmingham',
            }],
          },
        },
      });
    });
  });

  test(`unClaim task for caseRef=${scenarios[1].caseRef}`, () => {

    req = (
      {
        query: {
          caseRef: scenarios[1].caseRef,
        },
        session: {
          myTasks: [{caseRef: '2', location: 'Birmingham'}, {caseRef: '1'}],
          myAvailableTasks: [{caseRef: '4'}, {caseRef: '3'}],
          myFilteredAvailableTasks: [{caseRef: '4'}, {caseRef: '3'}],
          addLocations: [],
          removeLocations: [{
            index: 1,
            name: 'Birmingham',
          }],
        },
        /* eslint-disable  @typescript-eslint/no-explicit-any */
      } as any);

    unClaimTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: scenarios[1].expectedMyTask,
          checked: {checked: true},
          display: 'block',
        },
        myAvailableTasks: {
          taskList: scenarios[1].expectedMyAvailableTask,
          checked: {},
          display: 'none',
        },
        filter: {
          addLocations: [],
          removeLocations: [{
            index: 1,
            name: 'Birmingham',
          }],
        },
      },
    });
  });
});

