const mongoose = require('mongoose');

const logger = require('../../logger');

const connect = (connectionString) => {
  try {
    return mongoose.createConnection(connectionString);
  } catch (err) {
    logger.error({ err });
  }
};

module.exports.UserModel = connect(process.env.USER_DB_CONN_STRING).model(
  'user',
  require('./schema/user.schema')
);
module.exports.CustomerModel = connect(process.env.CUSTOMER_DB_CONN_STRING).model(
  'customer',
  require('./schema/customer.schema')
);
