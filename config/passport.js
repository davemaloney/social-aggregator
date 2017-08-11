const passport = require('passport');
const googleStrategy = require('./strategies/google.strategy');
const twitterStrategy = require('./strategies/twitter.strategy');
const facebookStrategy = require('./strategies/facebook.strategy');
const githubStrategy = require('./strategies/github.strategy');
const linkedinStrategy = require('./strategies/linkedin.strategy');

function Passport(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  googleStrategy();
  twitterStrategy();
  facebookStrategy();
  githubStrategy();
  linkedinStrategy();
}

module.exports = Passport;
