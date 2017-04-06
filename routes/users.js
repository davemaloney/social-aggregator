const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render(
    'users',
    {
      user: {
        name: req.user.displayName,
        image: req.user._json.image.url,
      },
    },
  );
});

module.exports = router;
