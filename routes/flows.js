const express = require('express');
const router = express.Router();
const db = require('../db/models');
//console.log('datbas models: ', db);
const Flow = db.Flow;

router.get('/', async (req, res, next) => {
    try {
        const flows = await Flow.findAll();
        return res.status(200).json({
            status: true,
            data: flows
        });
    } catch(error) {
        return res.status(500).json({
            status: false,
            errors: Object.values(error.errors).map(el => el.message)
        });
    }
    res.send('GET FLOWS');
});

// GET /:id

// POST /

// PUT /:id

// DELETE /:id

module.exports = router;
