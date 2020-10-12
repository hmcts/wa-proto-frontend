import * as express from 'express';
import Debug from 'debug';
import { createTaskManagerPage } from '../controllers/taskManagerController';

const debug = Debug('app:route:taskManager');

const router = express.Router();

router.get('/task-manager', (req, res) => {
  debug('task-manager router...');
  createTaskManagerPage(req, res);
});

router.get('/filter-task-manager', (req, res) => {
  const location = req.query.location;
  const caseworker = req.query.caseworker;

  debug(`task-manager router with location: ${location} and caseworker: ${caseworker}`);

  createTaskManagerPage(req, res);
});

module.exports = router;
