var express = require('express');
var router = express.Router();
const db = require('../db/models');
const Task = db.Task;

const { errorResponse } = require('./helpers');

// GET /
router.get('/', async (req, res, next) => {
    try {
        const items = await Task.findAll();
        return res.status(200).json({
            status: true,
            data: items
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

// GET /:id
router.get('/:id', async (req, res, next) => {
    try {
        const item_id = req.params.id;
        const item = await Task.findByPk(item_id);

        return res.status(200).json({
            status: true,
            data: item
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

function validTitle(title) {
    return title;
}
function validHours(hours) {
    return hours && 0 <= hours;
}
function validMinutes(minutes) {
    return minutes && 0 <= minutes && minutes <= 59;
}
function validSeconds(seconds) {
    return seconds && 0 <= seconds && seconds <= 59;
}
function validType(type) {
    return type == 'break' || type == 'focus';
}

// POST /
router.post('/', async (req, res, next) => {
    try {
        const { title, hours, minutes, seconds, type } = req.body;
        const attributes = {
            ...(validTitle(title) && { title }),
            ...(validHours(hours) && { hours }),
            ...(validMinutes(minutes) && { minutes }),
            ...(validSeconds(seconds) && { seconds }),
            ...(validType(type) && { type }),
        };
        const item = await Task.create(attributes);

        return res.status(201).json({
            status: true,
            data: item
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});


// PUT /:id
router.put('/:id', async (req, res, next) => {
    try {
        const item_id = req.params.id;
        //TODO: do validation to make sure item exists
        const { title, hours, minutes, seconds, type } = req.body;
        const attributes = {
            ...(validTitle(title) && { title }),
            ...(validHours(hours) && { hours }),
            ...(validMinutes(minutes) && { minutes }),
            ...(validSeconds(seconds) && { seconds }),
            ...(validType(type) && { type }),
        };
        await Task.update(attributes, {
            where: { id: item_id }
        });
        const item = await Task.findByPk(item_id);

        return res.status(200).json({
            status: true,
            data: item
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

// DELETE /:id
router.delete('/:id', async (req, res, next) => {
    try {
        const item_id = req.params.id;
        //TODO: do validation to make sure item exists
        await Task.destroy({
            where: { id: item_id }
        });

        return res.status(204).json({ status: true });
    } catch(error) {
        return errorResponse(res, error);
    }
});

module.exports = router;
