import request from 'supertest';
import { app } from '../../../main/app';
import * as controller from '../../../main/controllers/myCaseWork';
import * as filterController from '../../../main/controllers/filterTasksByLocations';

describe('myCaseWork routers', () => {
  
  test('get /filter router', async () => {
    const mock = jest.spyOn(filterController, 'filterTasksByLocations');

    const response = await request(app).get('/filter');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /claim-task?caseRef={caseRef} router', async () => {
    const mock = jest.spyOn(controller, 'claimTask');

    const response = await request(app).get('/claim-task?caseRef=1');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /unclaim-task?caseRef={caseRef} router', async () => {
    const mock = jest.spyOn(controller, 'unClaimTask');

    const response = await request(app).get('/unclaim-task?caseRef=1');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
