import request from 'supertest';
import { app } from '../../../main/app';
import * as taskManagerController from '../../../main/controllers/taskManagerController';

describe('task-manager page routers', () => {
/* eslint-disable  @typescript-eslint/no-explicit-any */
  let mock: any = null;

  beforeEach(() => {
    mock = jest.spyOn(taskManagerController, 'createTaskManagerPage');
  });

  afterEach(() => {
    mock.mockClear();
  });

  test('get /task-manager router', async () => {

    const response = await request(app).get('/task-manager');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /filter-task-manager router', async () => {

    const response = await request(app).get('/filter-task-manager');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
