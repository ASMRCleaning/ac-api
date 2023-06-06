const logger = require('../../logger');

const { createSuccessResponse, createErrorResponse } = require('../../response');

const { User } = require('../../model/user');

module.exports = async (req, res) => {
  try {
    const user = new User(req.body);

    user.register();
    return res.status(200).json(
      createSuccessResponse({
        message: 'User created',
      })
    );
  } catch (err) {
    logger.error({ err }, 'POST /register error: something went wrong');
    return res
      .status(500)
      .json(createErrorResponse(500, 'POST /register error: something went wrong'));
  }
};
