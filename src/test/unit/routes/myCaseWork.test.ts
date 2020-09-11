import request from 'supertest';
import { app } from '../../../main/app';
import * as controller from '../../../main/controllers/myCaseWork';

describe('myCaseWork routers', () => {
  test('get /my-case-work router', async () => {
    const mock = jest.spyOn(controller, 'createMyCaseWorkPage');

    const response = await request(app).get('/my-case-work');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /claim-task?caseRef={caseRef} router', async () => {
    const mock = jest.spyOn(controller, 'claimTask');

    const response = await request(app).get('/claim-task?caseRef=1');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
