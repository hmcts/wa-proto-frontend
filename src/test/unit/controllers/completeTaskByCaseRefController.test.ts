import { Response } from 'express';
import { completeTask } from '../../../main/controllers/completeTaskFromMyTasksController';
import { MyModel } from '../../../main/models/myModel';
import { Task } from '../../../main/models/task';

const stages = require('../../../main/data/stages');


describe('completeTaskFromMyTasks controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  beforeEach(() => {
    req = {
      params: {
        caseRef: null,
      },
      session: {
        myTasks: MyModel.getMyTasks(),
        myAvailableTasks: MyModel.getMyAvailableTasks(),
        myFilteredAvailableTasks: MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Taylor House', 'All'),
      },
      query: {},
    };

    res.render = jest.fn();
  });

  test('completeTask with an empty query', () => {

    const task6 = new Task('1549-2345-7854-9786', 'Davod Palic', 'Human Rights', 'Taylor House', 'Review respondent evidence', '+4 days', 9, 'past', 'Simone Harley');

    req.params.caseRef = task6.caseRef;

    completeTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-cases', {
      stages: stages,
    });

    expect(req.session.myTasks).not.toEqual(
      expect.arrayContaining([task6]),
    );
  });

  test('completeTask with the query', () => {
    req.query = {
      tasksType: 'myManagerTasks',
    };

    const task0 = new Task('1549-6338-2756-6773', 'Lala Joji', 'Human', 'Taylor House', 'Review respondent evidence', 'Today', 7, 'today', 'Amanda Mc Donald');
    req.params.caseRef = task0.caseRef;

    completeTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-cases', {
      stages: stages,
    });

    expect(req.session.myAvailableTasks).not.toEqual(
      expect.arrayContaining([task0]),
    );

  });
});

