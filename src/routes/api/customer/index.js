// src/routes/api/customer/index.js

/**
 * The main entry-point for our /login route
 */
const express = require('express');

// Create a router on which to mount our customer specific API endpoints
const router = express.Router();

// GET /customer
router.get('/', require('./get'));

// GET /customer/:username
router.get('/:username', require('./get-info'));

module.exports = router;
