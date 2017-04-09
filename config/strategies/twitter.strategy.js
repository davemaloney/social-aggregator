const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const twitterSecret = require('../secrets/twitter_client_secret.json');

function passportTwitter() {
  passport.use(new TwitterStrategy(
    {
      consumerKey: twitterSecret.consumer_key,
      consumerSecret: twitterSecret.consumer_secret,
      callbackURL: twitterSecret.callback_url,
      passReqToCallback: true
    },
    (req, token, tokenSecret, profile, done) => {
      const user = {};
      // user.email = profile.emails[0].value;
      user.image = profile._json.profile_image_url;
      user.displayName = profile.displayName;

      user.twitter = {};
      user.twitter.id = profile.id;
      user.twitter.token = token;

      done(null, user);
    }
  ));
}

module.exports = passportTwitter;
