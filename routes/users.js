var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET /:id

// POST /
// TODO: consider if you have body parser setup properly

// PUT /:id

// DELETE /:id

module.exports = router;
