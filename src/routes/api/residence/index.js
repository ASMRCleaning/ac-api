const express = require('express');

const router = express.Router();

// GET /residence
router.get('/', require('./get'));

// GET /customer/

// POST /residence
router.post('/', require('./post'));

// // PUT /residence
router.put('/', require('./put'));

// DELETE /residence
router.delete('/', require('./delete'));

module.exports = router;
