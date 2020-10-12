import request from 'supertest';
import { app } from '../../../main/app';
import * as controller from '../../../main/controllers/myCasesController';


describe('myCases router', () => {
  it('gets my-cases page', async () => {
    const mock = jest.spyOn(controller, 'createMyCasesPage');

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
