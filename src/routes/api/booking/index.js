const express = require('express');

const router = express.Router();

router.get('/', require('./get'));

router.get('/all', require('./get-all'));

router.post('/', require('./post'));

router.put('/', require('./put'));

router.put('/:id', require('./put-id'));

module.exports = router;
