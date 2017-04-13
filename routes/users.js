const express = require('express');

const router = express.Router();

router.use('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});
/* GET users listing. */
router.get('/', (req, res) => {
  res.render(
    'users',
    {
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    }
  );
});

module.exports = router;
