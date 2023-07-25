const express = require('express');

const router = express.Router();

// GET /residence
router.get('/', require('./get'));

// GET /residence/:id
router.get('/:id', require('./get-id'));

// GET /residence/customer/:id
router.get('/customer/:id', require('./get-by-customer'));

// POST /residence
router.post('/', require('./post'));

// // PUT /residence
router.put('/', require('./put'));

// DELETE /residence
router.delete('/', require('./delete'));

module.exports = router;
