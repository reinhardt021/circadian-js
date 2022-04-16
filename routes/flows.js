const express = require('express');
const router = express.Router();
const db = require('../db/models');
//console.log('datbas models: ', db);
const Flow = db.Flow;

function errorResponse(res, error) {
    return res.status(500).json({
        status: false,
        errors: Object.values(error.errors).map(el => el.message)
    });
}

router.get('/', async (req, res, next) => {
    try {
        const flows = await Flow.findAll();
        return res.status(200).json({
            status: true,
            data: flows
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

// GET /:id
router.get('/:id', (req, res, next) => {
    res.send('GET ITEM FLOW');
});

// POST /
router.post('/', async (req, res, next) => {
    try {
        const { title } = req.body;
        const flow = await Flow.create({ title });

        return res.status(201).json({
            status: true,
            data: flow
        });
    } catch(error) {
        return errorResponse(res, error);
    }
    res.send('POST FLOWS');
});

// PUT /:id
router.put('/:id', (req, res, next) => {
    res.send('PUT FLOW');
});

// DELETE /:id
router.delete('/:id', (req, res, next) => {
    res.send('DELETE FLOW');
});

module.exports = router;
