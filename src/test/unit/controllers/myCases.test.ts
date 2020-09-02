import { Request, Response } from 'express';
import { createMyCasesPage } from '../../../main/controllers/myCases';

const stages = require('../../../main/data/stages');

describe('myCases controller', () => {
  it('render my-cases page', async () => {
    const req = ({} as Request);
    const res = ({} as Response);
    res.render = jest.fn();

    createMyCasesPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-cases', {
      stages: stages,
    });
  });
});
