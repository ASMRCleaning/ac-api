const logger = require('../../logger');

const { UserModel, CustomerModel } = require('./connection');

const findByUsername = async (username) => {
  const user = await UserModel.findOne({ username: username }).lean();

  if (user) {
    const customer = await CustomerModel.findOne({ userId: user._id }).lean();
    return customer;
  }

  return user;
}

module.exports.findByUsername = findByUsername;
