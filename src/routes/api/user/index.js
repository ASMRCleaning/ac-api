const express = require('express');

const router = express.Router();

router.get('/', require('./get'));

router.put('/', require('./put'));

module.exports = router;
