import request from 'supertest';
import { app } from '../../../main/app';
import * as homeController from '../../../main/controllers/home';


describe('Home page router', () => {
  it('gets home page', async () => {
    const mock = jest.spyOn(homeController, 'createHomePage');
    
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
