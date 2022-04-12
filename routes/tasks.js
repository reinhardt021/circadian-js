var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('GET TASKS');
});

// GET /:id

// POST /

// PUT /:id

// DELETE /:id

module.exports = router;
