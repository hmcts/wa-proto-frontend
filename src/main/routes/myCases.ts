import * as express from 'express';
import Debug from 'debug';
import { createMyCasesPage } from '../controllers/myCasesController';

const debug = Debug('app:route:myCases');

const router = express.Router();

router.get('/', (req, res) => {
  debug('myCases router...');
  createMyCasesPage(req, res);
});

module.exports = router;
