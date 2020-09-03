import { Request, Response } from 'express';
import { createMyCaseWorkPage } from '../../../main/controllers/myCaseWork';
import { Task } from '../../../main/models/task';

jest.mock('../../../main/models/task');

describe('myCaseWork controller', () => {

  it('render my-case-work page', async () => {
    const req = ({} as Request);
    const res = ({} as Response);
    const renderFnMock = jest.fn();
    res.render = renderFnMock;

    createMyCaseWorkPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(Task).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('my-case-work', { 'task': {} });
  });
});
