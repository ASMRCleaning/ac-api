const logger = require('../../logger');

const { UserModel, CustomerModel } = require('./connection');

const findByUsername = async (username) => {
  const user = await UserModel.findOne({ username: username }).lean();
  logger.info('getting user now');
  logger.info(user);

  if (user) {
    logger.info('getting customer now');
    const customer = await CustomerModel.findOne({ userId: user._id }).lean();
    logger.info(customer);
    return customer;
  }

  return user;
}

module.exports.findByUsername = findByUsername;
