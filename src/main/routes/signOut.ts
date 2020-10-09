import * as express from 'express';
import {signOut} from '../controllers/userControllers';

const router = express.Router();

router.get('/sign-out', (req, res) => {
  signOut(req,res);
});

module.exports = router;
