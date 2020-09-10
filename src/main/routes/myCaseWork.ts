import * as express from 'express';
import Debug from 'debug';
import { createMyCaseWorkPage } from '../controllers/myCaseWork';

const debug = Debug('app:route:myCaseWork');

const router = express.Router();

router.get('/my-case-work', (req, res) => {
  debug('myCaseWork router...');
  createMyCaseWorkPage(req, res);
});

module.exports = router;
