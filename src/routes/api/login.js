const logger = require('../../logger');

const { User } = require('../../model/user');

const { createSuccessResponse, createErrorResponse } = require('../../response');

module.exports = async (req, res) => {
  try {
    const token = await User.validate(req.body.username, req.body.password);

    logger.info('Login successful')
    return res.status(200).json(createSuccessResponse({
      token: token
    }));
  } catch (err) {
    logger.warn({ err }, 'POST /login error:' + err.message);
    return res.status(404).json(
      createErrorResponse(404, err.message));
  }
}
