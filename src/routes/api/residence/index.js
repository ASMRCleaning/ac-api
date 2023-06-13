// src/routes/api/residence/index.js

const express = require('express');

// Create a router on which to mount our customer specific API endpoints
const router = express.Router();

// GET /customer
router.get('/', require('./get'));

module.exports = router;
