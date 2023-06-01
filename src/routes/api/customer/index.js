// src/routes/api/customer/index.js

/**
 * The main entry-point for our /login route
 */
const express = require('express');

// Create a router on which to mount our customer specific API endpoints
const router = express.Router();

router.get('/', require('./get'));

module.exports = router;
