import * as express from 'express';
import Debug from 'debug';

const debug = Debug('app:route:taskList');

const router = express.Router();

router.get('/task-list', (req, res) => {
  debug('task-list router...');
  res.send('hey you!');
});

module.exports = router;
