import * as express from 'express';
import Debug from 'debug';
import { createMyCaseWorkPage, claimTask, unClaimTask } from '../controllers/myCaseWork';

const debug = Debug('app:route:myCaseWork');

const router = express.Router();

router.get('/my-case-work', (req, res) => {
  debug('myCaseWork router...');
  createMyCaseWorkPage(req, res);
});

router.get('/claim-task', (req, res) => {
  debug(`claim-task router with caseRef=${req.query.caseRef}...`);
  claimTask(req, res);
});

router.get('/unclaim-task', (req, res) => {
  debug(`unclaim-task router with caseRef=${req.query.caseRef}...`);
  unClaimTask(req, res);
});


module.exports = router;
