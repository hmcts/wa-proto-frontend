import { Request, Response } from 'express';
import { createMyCaseWorkPage } from '../../../main/controllers/myCaseWork';

describe('myCaseWork controller', () => {
  it('render my-case-work page', async () => {
    const req = ({} as Request);
    const res = ({} as Response);
    res.render = jest.fn();

    createMyCaseWorkPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-case-work', { 'task': { 'caseRef': '1' } });
  });
});
