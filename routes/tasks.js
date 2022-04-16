var express = require('express');
var router = express.Router();
const db = require('../db/models');
const Task = db.Task;

const { errorResponse } = require('./helpers');

// GET /
router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.findAll();
        return res.status(200).json({
            status: true,
            data: tasks
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

// GET /:id

// POST /

// PUT /:id

// DELETE /:id

module.exports = router;
