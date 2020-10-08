import { Response } from 'express';
import { completeTask } from '../../../main/controllers/completeTaskFromMyTasks';

const stages = require('../../../main/data/stages');


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

    res.render = jest.fn();
  });

  test('completeTaskFromMyTasks method', () => {

    completeTask(req, res);
    req.params.caseRef = '1549-2345-7854-9786',

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-cases', {
      stages: stages,
    });

    expect(req.session.myTasks.length === 0);
  });
});

