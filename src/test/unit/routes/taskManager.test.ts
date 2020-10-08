import request from 'supertest';
import { app } from '../../../main/app';
import * as taskManagerController from '../../../main/controllers/taskManagerController';

describe('task-manager page routers', () => {

  test('get /task-manager router', async () => {
    const mock = jest.spyOn(taskManagerController, 'createTaskManagerPage');

    const response = await request(app).get('/task-manager');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
