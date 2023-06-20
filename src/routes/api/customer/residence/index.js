const express = require('express');

const router = express.Router();

// DELETE /customer/residence/:id
router.delete('/:id', require('./delete'));

// PUT /customer/residence/:id
router.put('/:id', require('./put'));

module.exports = router;
