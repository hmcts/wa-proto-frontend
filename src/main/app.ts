import * as bodyParser from 'body-parser';
import config = require('config');
import express from 'express';
import { Helmet } from './modules/helmet';
import * as path from 'path';
import { RouterFinder } from './router/routerFinder';
import favicon from 'serve-favicon';
import { HTTPError } from 'HttpError';
import { Nunjucks } from './modules/nunjucks';
import { MyModel } from './models/myModel';
import Debug from 'debug';
import { isNullOrUndefined } from 'util';

const { Express, Logger } = require('@hmcts/nodejs-logging');
const { setupDev } = require('./development');
const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';
const debug = Debug('app:app');

const session = require('express-session');
const redis = require('redis');
const useRedisStore: boolean = config.get('session.redis.redisStore') === 'true';

export const app = express();
app.locals.ENV = env;

// setup logging of HTTP requests
app.use(Express.accessLogger());

const logger = Logger.getLogger('app');

new Nunjucks(developmentMode).enableFor(app);
// secure the application by adding various HTTP headers to its responses
new Helmet(config.get('security')).enableFor(app);

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-cache, max-age=0, must-revalidate, no-store',
  );
  next();
});

if (useRedisStore) {
  debug(`redis store= ${useRedisStore}`);
  const RedisStore = require('connect-redis')(session);
  const redisOps = {
    url: config.get('session.redis.url'),
  };
  const redisClient = redis.createClient(redisOps);
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: config.get('session.redis.secret'),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );
} else {
  debug(`No redis store= ${useRedisStore}`);
  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.get('session.redis.secret'),
    cookie: { secure: false },
  }));
}


app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  debug(`req.session: ${JSON.stringify(req.session)}`);
  debug(`req.session.myAvailableTasks: ${JSON.stringify(req.session.myAvailableTasks)}`);
  debug(`req.session.myTasks: ${JSON.stringify(req.session.myTasks)}`);

  if (isNullOrUndefined(req.session.taskManager)) {
    req.session.taskManager = MyModel.getTaskManagerModel();
  }
  if (isNullOrUndefined(req.session.myAvailableTasks)) {
    req.session.myAvailableTasks = MyModel.getMyAvailableTasks();
  }

  if (isNullOrUndefined(req.session.myFilteredAvailableTasks)) {
    req.session.myFilteredAvailableTasks = MyModel.getMyFilteredAvailableTasks();
  }

  if (isNullOrUndefined(req.session.myTasks)) {
    req.session.myTasks = MyModel.getMyTasks();
  }

  if (isNullOrUndefined(req.session.addLocations)) {
    req.session.addLocations = MyModel.getAddLocations();
  }

  if (isNullOrUndefined(req.session.removeLocations)) {
    req.session.removeLocations = MyModel.getRemoveLocations();
  }

  next();
});

app.use('/', RouterFinder.findAll(path.join(__dirname, 'routes')));
setupDev(app, developmentMode);

// returning "not found" page for requests with paths not resolved by the router
app.use((req, res) => {
  res.status(404);
  res.render('not-found');
});

// error handler
app.use((err: HTTPError, req: express.Request, res: express.Response) => {
  logger.error(`${err.stack || err}`);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
