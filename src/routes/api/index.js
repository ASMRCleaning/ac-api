// src/routes/api/index.js

/**
 * The main entry-point
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();

// Sample a
router.get('/info', require('./get'));

// Other routes will go here later on...

module.exports = router;
