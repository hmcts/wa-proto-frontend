import { Response } from 'express';
import { completeTask } from '../../../main/controllers/completeTaskFromMyTasks';


describe('completeTaskFromMyTasks controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  beforeEach(() => {
    req = {
      params: {
        caseRef: '1549-2345-7854-9786',
      },
      session: {
        myTasks: [{
          caseRef: '1549-2345-7854-9786',
          caseName: 'test user',
          caseCategory: 'Humand Rights',
          location: 'Bradford',
          task: 'Review respondent evidence',
          dueDate: '+4 days',
          dateOrder: 5,
          dateColorCode: 'past',
        }],
        myAvailableTasks: [
          { location: 'Birmingham' },
          { location: 'Bradford' },
        ],
      },
    };

    res.redirect = jest.fn();
  });

  test('completeTaskFromMyTasks method', () => {

    completeTask(req, res);
    req.params.caseRef = '1549-2345-7854-9786',

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toBeCalledWith('/');

    expect(req.session.myTasks.length === 0);
  });
});

