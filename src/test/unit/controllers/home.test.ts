import { Request, Response } from 'express';
import { createHomePage } from '../../../main/controllers/home';

const homePageStages = require('../../../main/data/homeAppealStages');

describe('Home page controller', () => {
  it('render home page', async () => {
    const req = ({} as Request);
    const res = ({} as Response);
    res.render = jest.fn();

    createHomePage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('home', {
      stages: homePageStages,
    });
  });
});
