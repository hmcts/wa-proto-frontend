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
      expectedMyTask: [{ caseRef: ('1') }],
      expectedMyAvailableTask: [{ caseRef: '3' }, { caseRef: '4' }, { caseRef: '2', location: 'Birmingham' }],
    },
    {
      caseRef: '6',
      expectedMyTask: [{ caseRef: '1' }, { caseRef: '2', location: 'Birmingham' }],
      expectedMyAvailableTask: [{ caseRef: '3' }, { caseRef: '4' }],
    },
  ];
  describe.each(scenarios)(
    '%s', (scenario) => {

      test(`unClaim task for caseRef=${scenario.caseRef}`, () => {

        req = (
          {
            query: {
              caseRef: scenario.caseRef,
            },
            session: {
              myTasks: [{ caseRef: '1' }, { caseRef: '2', location: 'Birmingham' }],
              myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
              myFilteredAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
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
            myAvailableTasks: scenario.expectedMyAvailableTask,
            myTasks: scenario.expectedMyTask,
            addLocations: [],
            removeLocations: [{
              index: 1,
              name: 'Birmingham',
            }],
          },
        });
      });

    });

});
