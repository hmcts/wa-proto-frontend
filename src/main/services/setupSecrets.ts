import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { get, has, set } from 'lodash';

propertiesVolume.addTo(config);

const setSecret = (secretPath: import('lodash').Many<string | number | symbol>, configPath: import('lodash').Many<string | number | symbol>): void => {
  // Only overwrite the value if the secretPath is defined
  if (has(config, secretPath)) {
    set(config, configPath, get(config, secretPath));
  }
};
/* eslint-disable  @typescript-eslint/explicit-function-return-type */
const setupSecrets = () => {
  setSecret('secrets.wa.wa-redis-connection-string', 'session.redis.url');
  setSecret('secrets.wa.wa-redis-access-key', 'session.redis.secret');
  setSecret('secrets.wa.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
  return config;
};

export {
  setupSecrets,
};
