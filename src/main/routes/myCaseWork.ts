import * as express from 'express';
import Debug from 'debug';
import { createMyCaseWorkPage, claimTask, unClaimTask } from '../controllers/myCaseWork';
import { filterTasksByLocationsController } from '../controllers/filterTasksByLocations';

const debugMyCaseWork = Debug('app:route:myCaseWork');
const debugFilter = Debug('app:route:filter');
const debugClaimTask = Debug('app:route:claimTask');
const debugUnclaimTask = Debug('app:route:unclaimTask');

const router = express.Router();

router.get('/my-case-work', (req, res) => {
  debugMyCaseWork('my-case-work router...');
  createMyCaseWorkPage(req, res);
});

router.get('/filter', (req, res) => {
  debugFilter('filter router...');
  filterTasksByLocationsController(req, res);
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
