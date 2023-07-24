const express = require('express');

const router = express.Router();

router.get('/', require('./get'));

// PUT /visit/:id update a specific visit
// PUT /:bookingId/visit/:visitId update a specific booking with a specific visit
// DELETE /visit/:id delete a specific visit

// router.get('/visit/:id', require('./get-visit-id'));

// router.get('/all', require('./get-all'));

router.get('/:id', require('./get-id'));

router.post('/', require('./post'));

router.put('/', require('./put'));

router.put('/:id', require('./put-id'));

router.delete('/', require('./delete'));

router.delete('/:id', require('./delete-id'));

module.exports = router;
