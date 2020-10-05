import * as express from 'express';
import Debug from 'debug';
import { claimTask, unClaimTask } from '../controllers/myCaseWork';
import { filterTasksByLocations } from '../controllers/filterTasksByLocations';

const debugFilter = Debug('app:route:filter');
const debugClaimTask = Debug('app:route:claimTask');
const debugUnclaimTask = Debug('app:route:unclaimTask');

const router = express.Router();

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


module.exports = router;
