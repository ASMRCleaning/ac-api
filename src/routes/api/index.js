// src/routes/api/index.js

/**
 * The main entry-point
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();

// Define our first route, which will be: GET /v1/test
router.get('/test', require('./get'));

// Other routes will go here later on...

module.exports = router;
