import * as express from 'express';
import Debug from 'debug';
import { createTaskListPage } from '../controllers/taskListController';
import { claimTask } from '../controllers/claimTaskController';
import { unClaimTask } from '../controllers/unClaimTaskController';
import { filterTasksByLocations } from '../controllers/filterTasksByLocationsController';
import { completeTask } from '../controllers/completeTaskFromMyTasksController';
import { postReassignTask, reassignTask } from '../controllers/reassignTaskController';

const debugFilter = Debug('app:route:filter');
const debugClaimTask = Debug('app:route:claimTask');
const debugUnclaimTask = Debug('app:route:unclaimTask');
const debugTaskList = Debug('app:route:taskList');
const debugCompleteTask = Debug('app:route:completeTask');
const debugReassignTask = Debug('app:route:reassignTask');

const router = express.Router();

router.get('/task-list', (req, res) => {
  debugTaskList('task-list router...');
  createTaskListPage(req, res);
});

router.get('/filter', (req, res) => {
  debugFilter('filter router...');
  filterTasksByLocations(req, res);
});

router.get('/claim-task', (req, res) => {
  debugClaimTask(`claim-task router with caseRef=${req.query.caseRef}...`);
  claimTask(req, res);
});

router.get('/unclaim-task', (req, res) => {
  debugUnclaimTask(`unclaim-task router with caseRef=${req.query.caseRef}...`);
  unClaimTask(req, res);
});

router.get('/complete-task/:caseRef', (req, res) => {
  debugCompleteTask(`complete-task router with caseRef=${req.query.caseRef}...`);
  completeTask(req, res);
});

router.get('/reassign-task', (req, res) => {
  debugReassignTask(`reassign-task get router with caseRef=${req.query.caseRef}...`);
  reassignTask(req, res);
});

router.post('/reassign-task', (req, res) => {
  debugReassignTask(`reassign-task post router with caseRef=${req.query.caseRef}...`);
  if (req.query.tasksType === 'myManagerTasks') {
    // postReassignTaskAndGoToTaskManager(req, res);
  } else {
    postReassignTask(req, res);
  }
});

module.exports = router;
