const express = require('express');

const router = express.Router();

// GET /customer/residence
router.get('/', require('./get'));

// POST /customer/residence
router.post('/', require('./post'));

// PUT /customer/residence/:id
router.put('/', require('./put'));

// DELETE /customer/residence/:id
router.delete('/', require('./delete'));

module.exports = router;
