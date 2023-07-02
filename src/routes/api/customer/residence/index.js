const express = require('express');

const router = express.Router();

// GET /customer/residence
router.get('/', (req, res) => {
  // NOTE: This is a temporary solution
  res.status(200).json({ "status" : "okay" });
});

// POST /customer/residence
router.post('/', require('./post'));

// PUT /customer/residence/:id
router.put('/:id', require('./put'));

// DELETE /customer/residence/:id
router.delete('/:id', require('./delete'));

module.exports = router;
