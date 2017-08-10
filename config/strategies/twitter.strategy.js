const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../models/userModel');
const twitterSecret = require('../secrets/twitter_client_secret.json');

function passportTwitter() {
  passport.use(new TwitterStrategy(
    {
      consumerKey: twitterSecret.consumer_key,
      consumerSecret: twitterSecret.consumer_secret,
      callbackURL: twitterSecret.callback_url,
      passReqToCallback: true,
    },
    (req, token, tokenSecret, profile, done) => {
      const query = {
        'twitter.id': profile.id,
      };
      User.findOne(query, (error, user) => {
        if (user) {
          console.log('found');
          done(null, user);
        } else {
          console.log('not found');
          const newUser = new User();
          // newUser.email = profile.emails[0].value;
          newUser.image = profile._json.profile_image_url;
          newUser.displayName = profile.displayName;

          newUser.twitter = {};
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;

          newUser.save();
          done(null, newUser);
        }
      });
    }
  ));
}

module.exports = passportTwitter;
