// src/routes/api/employee/index.js

const express = require('express');

// Create a router on which to mount our customer specific API endpoints
const router = express.Router();

router.get('/', (req, res) => {
  try {
    return res.status(200).json({
      status: 'okay'
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
