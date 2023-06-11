const logger = require('../../logger');

const { UserModel, CustomerModel } = require('./connection');

const findByUsername = async (username) => {
  const user = await UserModel.findOne({ username: username });
  logger.info(user);

  if (user) {
    const customer = await CustomerModel.findOne({ userId: user._id });
    return customer;
  }

  return user;
}

module.exports.findByUsername = findByUsername;
