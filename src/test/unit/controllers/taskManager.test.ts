import { Response } from 'express';
import { createTaskManagerPage } from '../../../main/controllers/taskManagerController';

describe('taskManager controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const req = {} as any;
  const res = {} as Response;

  beforeEach(() => {

    res.render = jest.fn();

  });

  test('createTaskManagerPage method', () => {

    createTaskManagerPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-manager');
  });

});
