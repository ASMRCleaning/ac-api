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

// POST /residence/:id
router.post('/customer/:id', require('./post-by-customer'));

// PUT /residence
router.put('/', require('./put'));

// PUT /residence/:id
router.put('/:id', require('./put-id'));

// DELETE /residence
router.delete('/', require('./delete'));

// DELETE /residence/:id
router.delete('/:id', require('./delete-id'));

module.exports = router;
