const express = require('express');
const router = express.Router();
const facebook = require('../services/facebook')();

router.use('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});
/* GET users listing. */
router.get('/', (req, res) => {
  if (req.user.facebook) {
    facebook.getImage(req.user.facebook.token, (results) => {
      req.user.image = results;
      res.render('users',{user: req.user});
    });
  } else {
    res.render('users',{user: req.user});
  }
});

module.exports = router;
