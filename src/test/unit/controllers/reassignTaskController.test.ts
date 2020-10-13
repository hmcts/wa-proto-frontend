import { Response } from 'express';
import { reassignTask, postReassignTask, postReassignTaskAndGoToTaskManager } from '../../../main/controllers/reassignTaskController';
import { MyModel } from '../../../main/models/myModel';
import { Task } from '../../../main/models/task';
import * as taskManagerController from '../../../main/controllers/taskManagerController';
import { TaskManagerModel } from '../../../main/models/taskManager/taskManagerModel';

describe('re-assign controller', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let req = {} as any;
  const res = {} as Response;

  const task4 = new Task('1549-4765-3206-5586', 'Kili Muso', 'Protection', 'Taylor House', 'Review respondent evidence', 'Today', 7, 'today', 'Amanda Mc Donald');

  beforeEach(() => {
    req = (
      {
        query: {
          caseRef: task4.caseRef,
        },
        body: {
        },
        session: {
          myTasks: MyModel.getMyTasks(),
          myAvailableTasks: MyModel.getMyAvailableTasks(),
          myFilteredAvailableTasks: MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Taylor House', 'All'),
          addLocations: MyModel.getAddLocations(),
          removeLocations: MyModel.getRemoveLocations(),
        },
        /* eslint-disable  @typescript-eslint/no-explicit-any */
      } as any);

    res.render = jest.fn();

  });

  test('get re-assign method', () => {

    reassignTask(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('reassign-task', {
      'task': [task4],
      'locations': MyModel.getAllLocations(),
      'caseworker': MyModel.getAllCaseworker(),
    });
  });

  test('re-assign post method', () => {

    req.body = {
      caseworkers: 'Simone Harley',
    };

    postReassignTask(req, res);

    let expectedMyTasks: Array<Task> = MyModel.getMyTasks().filter((task) => task.caseRef !== req.query.caseRef);
    expectedMyTasks = expectedMyTasks.sort((a: Task, b: Task) => a.dateOrder - b.dateOrder).reverse();
    let expectedMyAvailableTasks: Array<Task> = MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Taylor House', 'All');
    expectedMyAvailableTasks = expectedMyAvailableTasks.sort((a: Task, b: Task) => a.dateOrder - b.dateOrder).reverse();


    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: expectedMyTasks,
          checked: { checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: expectedMyAvailableTasks,
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
    req.body.locations = 'Birmingham';

    postReassignTask(req, res);

    const expectedMyAvailableTasks: Array<Task> = MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Taylor House', 'All');

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: expect.arrayContaining(MyModel.getMyTasks()),
          checked: { checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: expect.arrayContaining(expectedMyAvailableTasks),
          checked: {},
          display: 'none',
        },
        filter: {
          addLocations: MyModel.getAddLocations(),
          removeLocations: MyModel.getRemoveLocations(),
        },
      },
    });
  });

  test('re-assign post method only caseworker', () => {
    req.body.caseworkers = 'Bisa Butler';

    postReassignTask(req, res);

    const expectedMyTasks: Array<Task> = MyModel.getMyTasks().filter((task) => task.caseRef !== req.query.caseRef);
    const expectedMyAvailableTasks: Array<Task> = MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Taylor House', 'All');

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: expect.arrayContaining(expectedMyTasks),
          checked: { checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: expect.arrayContaining(expectedMyAvailableTasks),
          checked: {},
          display: 'none',
        },
        filter: {
          addLocations: MyModel.getAddLocations(),
          removeLocations: MyModel.getRemoveLocations(),
        },
      },
    });
  });

  test('re-assign post method with no caseworker and no location shouldn\'t remove any task', () => {

    postReassignTask(req, res);

    const expectedMyAvailableTasks: Array<Task> = MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Taylor House', 'All');

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-list', {
      tasks: {
        myTasks: {
          taskList: expect.arrayContaining(MyModel.getMyTasks()),
          checked: { checked: true },
          display: 'block',
        },
        myAvailableTasks: {
          taskList: expect.arrayContaining(expectedMyAvailableTasks),
          checked: {},
          display: 'none',
        },
        filter: {
          addLocations: MyModel.getAddLocations(),
          removeLocations: MyModel.getRemoveLocations(),
        },
      },
    });
  });

  test('re-assign and go to task manage page post method', () => {

    const task0 = new Task('1549-6338-2756-6773', 'Lala Joji', 'Human', 'Taylor House', 'Review respondent evidence', 'Today', 7, 'today', 'Amanda Mc Donald');
    req.query.caseRef = task0.caseRef;
    req.session.taskManager = {
      selectedLocation: 'Taylor House',
      selectedCaseworker: 'All',
    };
    req.body = {
      caseworkers: 'Bisa Butler',
      locations: 'Birmingham',
    };

    const mock = jest.spyOn(taskManagerController, 'createTaskManagerPage');

    postReassignTaskAndGoToTaskManager(req, res);

    let expectedMyAvailableTasks: Array<Task> = MyModel.getMyAvailableTasksFilteredByOptionalLocationAndCaseworker('Taylor House', 'All').map((task) => {
      if (task.caseRef === task0.caseRef) {
        task.caseworker = req.body.caseworkers;
        return task;
      } else {
        return task;
      }
    });
    expectedMyAvailableTasks = expectedMyAvailableTasks.sort((a: Task, b: Task) => a.dateOrder - b.dateOrder).reverse();

    expect(mock).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('task-manager', {
      tasks: {
        myAvailableTasks: expectedMyAvailableTasks,
      },
      locations: TaskManagerModel.getLocations(req.session.taskManager.selectedLocation),
      caseworkers: TaskManagerModel.getCaseworkers(req.session.taskManager.selectedCaseworker),
    });
  });

});

