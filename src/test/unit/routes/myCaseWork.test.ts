import request from 'supertest';
import { app } from '../../../main/app';
import * as controller from '../../../main/controllers/myCaseWork';

describe('myCaseWork router', () => {
  it('gets my-case-work page', async () => {
    const mock = jest.spyOn(controller, 'createMyCaseWorkPage');

    const response = await request(app).get('/my-case-work');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
