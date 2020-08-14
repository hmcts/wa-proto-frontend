import * as express from 'express';
import Debug from 'debug';
import { createHomePage } from '../controllers/home';

const debug = Debug('app:route');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  debug('home router...');
  createHomePage(req, res);
});

module.exports = router;
