const logger = require('../../logger');

const { createSuccessResponse } = require('../../response');

module.exports = async (req, res) => {
  logger.info('register route');
  return res.status(200).json(createSuccessResponse({
    message: 'register route'
  }));
}
