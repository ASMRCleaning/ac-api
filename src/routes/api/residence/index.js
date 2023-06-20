const express = require('express');

// Create a router on which to mount our residence specific API endpoints
const router = express.Router();

// GET /residence
router.get('/', require('./get'));

module.exports = router;
