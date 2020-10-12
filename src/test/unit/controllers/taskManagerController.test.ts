import { Response } from 'express';
import { createTaskManagerPage } from '../../../main/controllers/taskManagerController';
import { Task } from '../../../main/models/task';
import { TaskManagerModel } from '../../../main/models/taskManager/taskManagerModel';
import { MyModel } from '../../../main/models/myModel';
import _ from 'lodash';


const scenarios = [
  {
    session: {
      myAvailableTasks: MyModel.getMyAvailableTasks(),
      myTasks: [] as Task[],
      myFilteredAvailableTasks: [] as Task[],
      taskManager: {
        selectedLocation: 'Taylor House',
        selectedCaseworker: 'All',
      },
    },
    query: {},
    expectedLocations: TaskManagerModel.getLocations('Taylor House'),
    expectedCaseworkers: TaskManagerModel.getCaseworkers('All'),
    expectedFilteredTasks: MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Taylor House'),
  },
  {
    session: {
      myAvailableTasks: MyModel.getMyAvailableTasks(),
      myTasks: [] as Task[],
      myFilteredAvailableTasks: [] as Task[],
      taskManager: {
        selectedLocation: 'Taylor House',
        selectedCaseworker: 'All',
      },
    },
    query: {
      location: 'Birmingham',
      caseworker: 'Bisa Butler',
    },
    expectedLocations: TaskManagerModel.getLocations('Birmingham'),
    expectedCaseworkers: TaskManagerModel.getCaseworkers('Bisa Butler'),
    expectedFilteredTasks: MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Birmingham', 'Bisa Butler'),
  },
];

describe.each(scenarios)('taskManager controller', (scenario) => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const req = {} as any;
  const res = {} as Response;

  let location = null;
  let caseworker = null;

  if (!_.isEmpty(scenario.query)) {
    location = scenario.query.location;
    caseworker = scenario.query.caseworker;
  } else {
    location = scenario.session.taskManager.selectedLocation;
    caseworker = scenario.session.taskManager.selectedCaseworker;
  }

  req.session = scenario.session;
  req.query = scenario.query;
  res.render = jest.fn();


  test(`filter task manager tasks by \n
    location: ${location} \n
    and caseworker: ${caseworker}`, () => {

    createTaskManagerPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-manager', {
      tasks: {
        myAvailableTasks: scenario.expectedFilteredTasks,
      },
      locations: scenario.expectedLocations,
      caseWorkers: scenario.expectedCaseworkers,
    });
  });

});
