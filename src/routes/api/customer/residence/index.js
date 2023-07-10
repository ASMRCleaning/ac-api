const express = require('express');

const router = express.Router();

// GET /customer/residence
router.get('/', require('./get'));

// POST /customer/residence
router.post('/', require('./post'));

// // PUT /customer/residence
router.put('/', require('./put'));

// DELETE /customer/residence
router.delete('/', require('./delete'));

module.exports = router;
