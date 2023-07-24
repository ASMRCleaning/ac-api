const express = require('express');

const router = express.Router();

// GET /booking
router.get('/', require('./get'));

// GET /booking/all
router.get('/all', require('./get-all'));

// GET /booking/:id
router.get('/:id', require('./get-id'));

// POST /booking
router.post('/', require('./post'));

// POST /booking/:id
router.post('/:id', require('./post'));

// PUT /booking
router.put('/', require('./put'));

// PUT /booking/:id
router.put('/:id', require('./put-id'));

// DELETE /booking
router.delete('/', require('./delete'));

// DELETE /booking/:id
router.delete('/:id', require('./delete-id'));

module.exports = router;
