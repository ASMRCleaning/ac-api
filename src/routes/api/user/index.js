const express = require('express');

const router = express.Router();

router.get('/', require('./get'));

router.get('/all', require('./get-all'));

router.get('/:id', require('./get-id'));

router.put('/', require('./put'));

router.put('/password', require('./put-password'));

router.put('/password/:id', require('./put-password-id'));

module.exports = router;
