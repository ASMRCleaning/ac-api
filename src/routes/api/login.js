const logger = require('../../logger');

const { User } = require('../../model/user');

const { createSuccessResponse } = require('../../response');

module.exports = async (req, res) => {
  const token = await User.validate(req.body.username, req.body.password);
  const customer = await User.byUsername(req.body.username);
  logger.info(customer);

  logger.info('Login successful')
  return res.status(200).json(createSuccessResponse({
    firstName: customer.firstName,
    lastName: customer.lastName,
    token: token
  }));
}
