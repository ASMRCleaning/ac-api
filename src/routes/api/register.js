const logger = require('../../logger');

const { createSuccessResponse, createErrorResponse } = require('../../response');

const { User } = require('../../model/user');

module.exports = async (req, res) => {
  logger.info('register route');

  const user = new User({ username: req.body.username });

  try {
    user.register();
    return res.status(200).json(createSuccessResponse({
      message: 'register route'
    }));
  } catch (err) {
    return res.status(404).json(createErrorResponse(404, err));
  }
}
