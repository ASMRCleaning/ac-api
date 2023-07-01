// src/routes/api/customer/index.js

const express = require('express');

// Create a router on which to mount our customer specific API endpoints
const router = express.Router();

// GET /
router.get('/', require('./get'));

// PUT /customer/:id
router.put('/:id', require('./put'));

// Route chaining for /residence i.e. /customer/residence
router.use('/residence', require('./residence'));

module.exports = router;
