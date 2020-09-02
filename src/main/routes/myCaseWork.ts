import * as express from 'express';
import Debug from 'debug';

const debug = Debug('app:route:myCaseWork');

const router = express.Router();

router.get('/my-case-work', (req, res) => {
  debug('myCaseWork router...');
  res.send('Work in Progress');
});

module.exports = router;
