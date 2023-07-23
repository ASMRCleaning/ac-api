const express = require('express');

const router = express.Router();

router.get('/', require('./get'));

router.get('/all', require('./get-all'));

router.post('/', require('./post'));

module.exports = router;
