import * as express from 'express';
import Debug from 'debug';
import { createTaskListPage } from '../controllers/taskListController';

const debug = Debug('app:route:taskList');

const router = express.Router();

router.get('/task-list', (req, res) => {
  debug('task-list router...');
  createTaskListPage(req, res);
});

module.exports = router;
