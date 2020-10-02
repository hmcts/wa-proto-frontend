import request from 'supertest';
import { app } from '../../../main/app';

describe('taskList routers', () => {
  
  test('get /task-list router', async () => {

    const response = await request(app).get('/task-list');

    expect(response.status).toBe(200);
  });
  
});
