import { Response } from 'express';
import { createMyCaseWorkPage, claimTask } from '../../../main/controllers/myCaseWork';


jest.mock('../../../main/models/task');

describe('myCaseWork controller', () => {

  test('createMyCaseWorkPage method', async () => {
    const req = (
      {
        session: {
          myTasks: [{}],
          myAvailableTasks: [{}],
        },
        /* eslint-disable  @typescript-eslint/no-explicit-any */
      } as any);
    const res = ({} as Response);

    res.render = jest.fn();

    createMyCaseWorkPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-case-work', {
      'tasks': {
        'myAvailableTasks': [{}],
        'myTasks': [{}],
      },
    });
  });

  test('claimTask method', async () => {

    const req = (
      {
        params: {
          caseRef: '3',
        },
        session: {
          myTasks: [{ caseRef: '1' }, { caseRef: '2' }],
          myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
        },
        /* eslint-disable  @typescript-eslint/no-explicit-any */
      } as any);
    const res = ({} as Response);

    res.render = jest.fn();

    claimTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-case-work', {
      tasks: {
        myAvailableTasks: [{ caseRef: '4' }],
        myTasks: [{ caseRef: '1' }, { caseRef: '2' }],
      },
    });
  });

});
