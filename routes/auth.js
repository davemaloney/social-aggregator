const express = require('express');
const passport = require('passport');

const router = express.Router();

router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/users/',
    failure: '/error/',
  }));

router.route('/google')
  .get(passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }));

router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/users/',
    failure: '/error/',
  }));

router.route('/twitter')
  .get(passport.authenticate('twitter'));

router.route('/linkedin/callback')
  .get(passport.authenticate('linkedin', {
    successRedirect: '/users/',
    failure: '/error/',
  }));

router.route('/linkedin')
  .get(passport.authenticate('linkedin'));

router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/users/',
    failure: '/error/',
  }));

router.route('/facebook')
  .get(passport.authenticate('facebook', {
    scope: ['email']
  }));

router.route('/github/callback')
  .get(passport.authenticate('github', {
    successRedirect: '/users/',
    failure: '/error/',
  }));

router.route('/github')
  .get(passport.authenticate('github'));

module.exports = router;
