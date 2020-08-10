import * as express from 'express';
import { User } from '../models/user';
import Debug from 'debug';
const debug = Debug('app:home');

const router = express.Router();

const user = new User('David', 'Crespo');

/* GET home page. */
router.get('/', (req, res) => {
  debug('home router called...');
  res.render('home', {user: user});
});

module.exports = router;
