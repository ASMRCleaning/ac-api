// src/routes/api/residence/get.js

const logger = require('../../../logger');

const { Residence } = require('../../../model/residence');

module.exports = async (req, res) => {
  return res.status(200).json({
    status: 'ok'
  });
};
