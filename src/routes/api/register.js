const logger = require('../../logger');

const { createSuccessResponse, createErrorResponse } = require('../../response');

const { User } = require('../../model/user');

module.exports = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.register();
    
    return res.status(201).json(createSuccessResponse({
      message: 'User created'
    }));
  } catch (err) {
    logger.error({ err }, 'POST /register error: ' + err.message);
    return res.status(500).json(
      createErrorResponse(500, err.message));
  }
}
