import * as express from 'express';
import Debug from 'debug';
import { createHomePage } from '../controllers/home';

const debug = Debug('app:route:home');

const router = express.Router();

router.get('/', (req, res) => {
  debug('home router...');
  createHomePage(req, res);
});

module.exports = router;
