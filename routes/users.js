const express = require('express');
const facebookService = require('../services/facebook');

const router = express.Router();

router.use('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});
/* GET users listing. */
router.get('/', (req, res) => {
  if (req.user.facebook) {
    facebookService().getImage(req.user.facebook.token, (results) => {
      req.user.image = results;
      res.render('users', {
        user: req.user
      });
    });
  } else {
    res.render('users', {
      user: req.user
    });
  }
});

module.exports = router;
