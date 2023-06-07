const logger = require('../../logger');

const { User } = require('../../model/user');

const { createSuccessResponse } = require('../../response');

module.exports = async (req, res) => {
  const token = await User.validate(req.body.username, req.body.password);
  logger.info(token);

  return res.status(200).json(createSuccessResponse({
    message: 'login route',
    token: token
  }));
}
