import { Response } from 'express';
import { reassignTask , postReassignTask } from '../../../main/controllers/reassignTaskController';
import {MyModel} from '../../../main/models/myModel';

describe('re-assign controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  beforeEach(() => {
    req = (
      {
        query: {
          caseRef: '3',
        },
        body: {
        },
        session: {
          myTasks: [
            { caseRef: '1', location: 'test', caseworker: 'caseworker' },
            { caseRef: '2', location: 'testTwo', caseworker: 'caseworkerTwo' },
            { caseRef: '3', location: 'testThree', caseworker: 'caseworkerThree' },

          ],

          myAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
          myFilteredAvailableTasks: [{ caseRef: '3' }, { caseRef: '4' }],
          addLocations: [
            {
              index: 1,
              name: 'Birmingham',
            },
          ],
          removeLocations: [],
        },
        /* eslint-disable  @typescript-eslint/no-explicit-any */
      } as any);

    res.render = jest.fn();

  });

  test('get re-assign method', () => {
    const locations = MyModel.getAllLocations();
    const caseworker = MyModel.getAllCaseworker();
    req.query.caseRef = '1';
    reassignTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('reassign-task', {
      'task': [{
        'caseRef': '1',
        'caseworker': 'caseworker',
        'location': 'test',
      }],
      'locations': locations,
      'caseworker': caseworker,
    });
  });

  test('re-assign post method', () => {
    req.query.caseRef = '1';
    req.body.locations = 'New Location';
    req.body.caseworkers = 'New CaseWorker';

    postReassignTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: [   { caseRef: '2', location: 'testTwo', caseworker: 'caseworkerTwo' },
            { caseRef: '3', location: 'testThree', caseworker: 'caseworkerThree' }],
          checked: { checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: req.session.myFilteredAvailableTasks,
          checked: {},
          display: 'none',
        },
        filter: {
          addLocations: req.session.addLocations,
          removeLocations: req.session.removeLocations,
        },
      },
    });
  });

  test('re-assign post method only location', () => {
    req.query.caseRef = '2';
    req.body.locations = 'New Location';
    postReassignTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: [   { caseRef: '1', location: 'test', caseworker: 'caseworker' },
            { caseRef: '3', location: 'testThree', caseworker: 'caseworkerThree' }],
          checked: { checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: req.session.myFilteredAvailableTasks,
          checked: {},
          display: 'none',
        },
        filter: {
          addLocations: req.session.addLocations,
          removeLocations: req.session.removeLocations,
        },
      },
    });
  });

  test('re-assign post method only caseworker', () => {
    req.query.caseRef = '3';
    req.body.caseworkers = 'New CaseWorker';

    postReassignTask(req, res);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: [  { caseRef: '1', location: 'test', caseworker: 'caseworker' },
            { caseRef: '2', location: 'testTwo', caseworker: 'caseworkerTwo' }],
          checked: { checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: req.session.myFilteredAvailableTasks,
          checked: {},
          display: 'none',
        },
        filter: {
          addLocations: req.session.addLocations,
          removeLocations: req.session.removeLocations,
        },
      },
    });
  });

  test('re-assign post method shouldn\'t remove any task', () => {
    req.query.caseRef = '3';

    postReassignTask(req, res);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: [   { caseRef: '1', location: 'test', caseworker: 'caseworker' },
            { caseRef: '2', location: 'testTwo', caseworker: 'caseworkerTwo' },
            { caseRef: '3', location: 'testThree', caseworker: 'caseworkerThree' }],
          checked: { checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: req.session.myFilteredAvailableTasks,
          checked: {},
          display: 'none',
        },
        filter: {
          addLocations: req.session.addLocations,
          removeLocations: req.session.removeLocations,
        },
      },
    });
  });

});
