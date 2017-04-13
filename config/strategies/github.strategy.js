const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

const githubSecret = require('../secrets/github_client_secret.json');

function passportGithub() {
  passport.use(new GithubStrategy(
    {
      clientID: githubSecret.client_id,
      clientSecret: githubSecret.client_secret,
      callbackURL: githubSecret.callback_url,
    },
    (req, accessToken, refreshToken, profile, done) => {
      var user = {};
      user.profile = profile;
      user.displayName = profile.displayName;
      user.image = profile._json.avatar_url;

      user.github = {};
      user.github.id = profile.id;
      user.github.token = accessToken;

      done(null, user);
    }
  ));
}

module.exports = passportGithub;
