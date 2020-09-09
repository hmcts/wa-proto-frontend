import { Response } from 'express';
import { createMyCaseWorkPage } from '../../../main/controllers/myCaseWork';

jest.mock('../../../main/models/task');

describe('myCaseWork controller', () => {

  test('createMyCaseWorkPage method', async () => {
    const req = (
      {
        session: {
          myTasks: [{}],
          myAvailableTasks: [{}],
        },
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
});
