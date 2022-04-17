const express = require('express');
const router = express.Router();
const db = require('../db/models');
const Flow = db.Flow;
const Task = db.Task;

const { errorResponse } = require('./helpers');

// GET /
router.get('/', async (req, res, next) => {
    try {
        const flows = await Flow.findAll({ 
            include: Task
            //include: [
                //{
                    //model: Task,
                    //where: { flow_id: Sequelize.col('flow.id') }
                //}
            //] 
        });
        return res.status(200).json({
            status: true,
            data: flows
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

// GET /:id
router.get('/:id', async (req, res, next) => {
    try {
        const flow = await Flow.findByPk(req.params.id);

        return res.status(200).json({
            status: true,
            data: flow
        });
    } catch(error) {
        return errorResponse(res, error);
    }
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
});

// PUT /:id
router.put('/:id', async (req, res, next) => {
    try {
        const { title } = req.body;
        await Flow.update({ title }, {
            where: {
                id: req.params.id
            }
        });
        const flow = await Flow.findByPk(req.params.id);

        return res.status(200).json({
            status: true,
            data: flow
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

// DELETE /:id
router.delete('/:id', async (req, res, next) => {
    try {
        await Flow.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(204).json({
            status: true
        });
    } catch(error) {
        return errorResponse(res, error);
    }
});

module.exports = router;
