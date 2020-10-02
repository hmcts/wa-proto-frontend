import request from 'supertest';
import { app } from '../../../main/app';
import * as controller from '../../../main/controllers/taskListController';

describe('taskList routers', () => {

  test('get /task-list router', async () => {
    const mock = jest.spyOn(controller, 'createTaskListPage');

    const response = await request(app).get('/task-list');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

});
