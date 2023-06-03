const { userDb } = require('./connection');

const logger = require('../../logger');

async function createUser(user) {
  logger.info('before create');
  const model = new userDb(user);
  model.save();
  logger.info('after create');
  return true;
}

module.exports.createUser = createUser;
