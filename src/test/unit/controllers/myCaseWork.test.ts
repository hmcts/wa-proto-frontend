import { Response } from 'express';
import { createMyCaseWorkPage, claimTask, unClaimTask } from '../../../main/controllers/myCaseWork';
import { MyCaseWorkModel as model } from '../../../main/models/myCaseWorkModel';

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

    jest.spyOn(model, 'getAddLocations').mockReturnValue([
      {
        'index': 1,
        'name': 'Birmingham',
      },
    ]);
    jest.spyOn(model, 'getRemoveLocations').mockReturnValue([]);

  });

  test('createMyCaseWorkPage method', () => {

    createMyCaseWorkPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-case-work', {
      tasks: {
        myAvailableTasks: [{}],
        myTasks: [{}],
        addLocations: [
          {
            index: 1,
            name: 'Birmingham',
          },
        ],
        removeLocations: [],
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
        addLocations: [
          {
            index: 1,
            name: 'Birmingham',
          },
        ],
        removeLocations: [],
      },
    });
  });

  const scenarios = [
    {
      caseRef: '2',
      expectedMyTask: [{ caseRef: ('1') }],
      expectedMyAvailableTask: [{ caseRef: '3' }, { caseRef: '4' }, { caseRef: '2' }],
    },
    {
      caseRef: '6',
      expectedMyTask: [{ caseRef: '1' }, { caseRef: '2' }],
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
              myTasks: [{ caseRef: '1' }, { caseRef: '2' }],
              myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
            },
            /* eslint-disable  @typescript-eslint/no-explicit-any */
          } as any);

        unClaimTask(req, res);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith('my-case-work', {
          tasks: {
            myAvailableTasks: scenario.expectedMyAvailableTask,
            myTasks: scenario.expectedMyTask,
            addLocations: [
              {
                index: 1,
                name: 'Birmingham',
              },
            ],
            removeLocations: [],
          },
        });
      });

    });

});
