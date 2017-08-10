const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../../models/userModel');
const githubSecret = require('../secrets/github_client_secret.json');

function passportGithub() {
  passport.use(new GithubStrategy(
    {
      clientID: githubSecret.client_id,
      clientSecret: githubSecret.client_secret,
      callbackURL: githubSecret.callback_url,
    },
    (req, accessToken, refreshToken, profile, done) => {
      const query = {
        'github.id': profile.id,
      };
      User.findOne(query, (error, user) => {
        if (user) {
          console.log('found');
          done(null, user);
        } else {
          console.log('not found');
          const newUser = new User();
          newUser.displayName = profile.displayName;
          newUser.image = profile._json.avatar_url;

          newUser.github = {};
          newUser.github.id = profile.id;
          newUser.github.token = accessToken;

          newUser.save();
          done(null, newUser);
        }
      });
    }
  ));
}

module.exports = passportGithub;
