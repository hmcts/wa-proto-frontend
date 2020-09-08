const session = require('express-session');

export function setupSession() {
  return session({
    secret: 'defaultsecret',
    resave: false,
    saveUninitialized: true,
  });
}
