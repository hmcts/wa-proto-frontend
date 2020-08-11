import * as express from 'express';
const userStages = require('../data/appealStages');
import Debug from 'debug';
const debug = Debug('app:home');

const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  debug('home router called...');
  res.render('home', {
    stages: userStages,
  });
});

module.exports = router;
