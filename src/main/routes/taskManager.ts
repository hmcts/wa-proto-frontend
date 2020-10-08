import * as express from 'express';
import Debug from 'debug';
import { createTaskManagerPage } from '../controllers/taskManagerController';

const debug = Debug('app:route:taskManager');

const router = express.Router();

router.get('/task-manager', (req, res) => {
  debug('task-manager router...');
  createTaskManagerPage(req, res);
});

module.exports = router;
