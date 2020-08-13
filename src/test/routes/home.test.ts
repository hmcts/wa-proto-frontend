import request from 'supertest';
import { app } from '../../main/app';

describe('Home page', () => {
  it('should return sample home page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
