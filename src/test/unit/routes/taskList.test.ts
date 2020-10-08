import request from 'supertest';
import { app } from '../../../main/app';
import * as claimTaskController from '../../../main/controllers/claimTaskController';
import * as unClaimTaskController from '../../../main/controllers/unClaimTaskController';
import * as filterController from '../../../main/controllers/filterTasksByLocations';
import * as taskListController from '../../../main/controllers/taskListController';
import * as reassignTaskController from '../../../main/controllers/reassignTaskController';
import * as completeTaskFromMyTasks from '../../../main/controllers/completeTaskFromMyTasks';

describe('task-list page routers', () => {

  test('get /filter router', async () => {
    const mock = jest.spyOn(filterController, 'filterTasksByLocations');

    const response = await request(app).get('/filter');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /claim-task?caseRef={caseRef} router', async () => {
    const mock = jest.spyOn(claimTaskController, 'claimTask');

    const response = await request(app).get('/claim-task?caseRef=1&complete=false');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /unclaim-task?caseRef={caseRef} router', async () => {
    const mock = jest.spyOn(unClaimTaskController, 'unClaimTask');

    const response = await request(app).get('/unclaim-task?caseRef=1');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /task-list router', async () => {
    const mock = jest.spyOn(taskListController, 'createTaskListPage');

    const response = await request(app).get('/task-list');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /complete-task/caseRef router', async () => {
    const mock = jest.spyOn(completeTaskFromMyTasks, 'completeTask');
    const caseRef = 'dkfkgf';
    const response = await request(app).get('/complete-task/'+caseRef);

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('get /reassign-task router', async () => {
    const mock = jest.spyOn(reassignTaskController, 'reassignTask');

    const response = await request(app).get('/reassign-task?caseRef=34');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('post /reassign-task router', async () => {
    const mock = jest.spyOn(reassignTaskController, 'postReassignTask');

    const response = await request(app).post('/reassign-task?caseRef=34');

    expect(response.status).toBe(200);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
