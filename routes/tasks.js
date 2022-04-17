const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../db/models');
const Flow = db.Flow;
const Task = db.Task;

const { errorResponse } = require('./helpers');

// GET /
router.get('/', async (req, res, next) => {
    try {
        const flow_id = req.params.flow_id;
        const flow = await Flow.findByPk(flow_id);
        if (flow == null) {
            return res.status(400).json({
                status: false,
                errors: 'Invalid flow_id'
            });
        }

        const items = await Task.findAll({ where: { flow_id } });
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
        // TODO: find out how to move this into middleware 
        // to run before just this group of routes
        const flow_id = req.params.flow_id;
        const flow = await Flow.findByPk(flow_id);
        if (flow == null) {
            return res.status(400).json({
                status: false,
                errors: 'Invalid flow_id'
            });
        }

        const item_id = req.params.id;
        const item = await Task.findByPk(item_id, { where: { flow_id } });

        return res.status(200).json({
            status: true,
            data: item
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

async function validFlow(flow_id) {
    if (!flow_id) {
        return null;
    }
    const flow = await Flow.findByPk(flow_id);

    return flow ;
}
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
        const { flow_id, title, hours, minutes, seconds, type } = req.body;
        const attributes = {
            ...(await validFlow(flow_id) && { flow_id }),
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
        const { flow_id, title, hours, minutes, seconds, type } = req.body;
        const attributes = {
            ...(await validFlow(flow_id) && { flow_id }),
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
