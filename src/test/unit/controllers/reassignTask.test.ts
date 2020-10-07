import { Response } from 'express';
import { reassignTask , postReassignTask } from '../../../main/controllers/reassignTaskController';
import {MyCaseWorkModel} from '../../../main/models/myCaseWorkModel';
import  * as chai from 'chai';

const expects = chai.expect;

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
    const locations = MyCaseWorkModel.getAllLocations();
    const caseworker = MyCaseWorkModel.getAllCaseworker();
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
        'myTasks': req.session.myTasks,
        'myAvailableTasks': req.session.myFilteredAvailableTasks,
        'addLocations': req.session.addLocations,
        'removeLocations': req.session.removeLocations,
      },
    });
  });

  test('re-assign post method only location', () => {
    req.query.caseRef = '2';
    req.body.locations = 'New Location';
    postReassignTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expects(req.session.myTasks[2].caseworker).deep.equals('caseworkerTwo');
    expects(req.session.myTasks[2].location).deep.equals('New Location');
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        'myTasks': req.session.myTasks,
        'myAvailableTasks': req.session.myFilteredAvailableTasks,
        'addLocations': req.session.addLocations,
        'removeLocations': req.session.removeLocations,
      },
    });
  });

  test('re-assign post method only caseworker', () => {
    req.query.caseRef = '3';
    req.body.caseworkers = 'New CaseWorker';

    postReassignTask(req, res);
    expect(res.render).toHaveBeenCalledTimes(1);
    expects(req.session.myTasks[2].caseworker).deep.equals('New CaseWorker');
    expects(req.session.myTasks[2].location).deep.equals('testThree');
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        'myTasks': req.session.myTasks,
        'myAvailableTasks': req.session.myFilteredAvailableTasks,
        'addLocations': req.session.addLocations,
        'removeLocations': req.session.removeLocations,
      },
    });
  });

});
