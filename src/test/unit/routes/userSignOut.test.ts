import * as signOut from '../../../main/controllers/userControllers';
import request from 'supertest';
import {app} from '../../../main/app';

describe('myCases router', () => {
  it('sign out', async () => {
    const mock = jest.spyOn(signOut, 'signOut');

    const response = await request(app).get('/sign-out');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
