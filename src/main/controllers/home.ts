import { Request, Response } from 'express';
import { Page } from '../models/page';
import Debug from 'debug';

const homePageStages = require('../data/homeAppealStages');
const debug = Debug('app:controller');

export function createHomePage(req: Request, res: Response) {
  debug('home controller...');
  res.render('home', {
    stages: new Page('home', homePageStages).stages,
  });
}
