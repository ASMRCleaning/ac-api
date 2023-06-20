// src/routes/api/customer/index.js

const express = require('express');

// Create a router on which to mount our customer specific API endpoints
const router = express.Router();

// GET /customer/id/:id
router.get('/id/:id', require('./get'));

// GET /customer/:username
router.get('/:username', require('./get-info'));

// PUT /customer/:id
router.put('/:id', require('./put'));

router.use('/residence', require('./residence'));

module.exports = router;
