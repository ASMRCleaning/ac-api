const mongoose = require('mongoose');

const logger = require('../../logger');

const UserClass = () => {
  try {
    logger.info('before creating connection');
    const conn = mongoose.createConnection(process.env.MONGO_CONN_STRING);
    logger.info('after creating connection');
    return conn;
  } catch (err) {
    logger.error({err});
  }
}

module.exports.UserClass = UserClass().model('users', require('./schema/user.schema'));
