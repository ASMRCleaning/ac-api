const mongoose = require('mongoose');

const logger = require('../../logger');

const connect = (connectionString) => {
  try {
    return mongoose.createConnection(connectionString);
  } catch (err) {
    logger.error({ err }, 'Connection error: could not create a connection');
    throw new Error({ err }, 'Connection error: could not create a connection');
  }
};

module.exports.UserModel = connect(process.env.DB_CONN_STRING).model(
  'user',
  require('./schema/user.schema')
);

module.exports.ResidenceModel = connect(process.env.DB_CONN_STRING).model(
  'residence',
  require('./schema/residence.schema')
);
