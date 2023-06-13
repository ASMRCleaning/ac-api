const logger = require('../logger');

module.exports = (value, key) => {
  if (typeof(value) === 'boolean') {
    return value;
  }

  if (value) {
    return value;
  }

  logger.warn(`User Class: a(n) ${ key } value is required`);
  throw new Error(`a(n) ${ key } value is required`);
}
