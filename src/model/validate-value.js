const logger = require('../logger');

const validateString = (value, key) => {
  if (typeof(value) === 'string') {
      return value
  }

  logger.warn(`User Class: value of ${ key } not accepted`);
  throw new Error(`User Class: value of ${ key } not accepted`);
}

const validateBoolean = (value, key) => {
  if (typeof(value) === 'boolean') {
    return value
  } 

  logger.warn(`User Class: value of ${ key } not accepted`);
  throw new Error(`User Class: value of ${ key } not accepted`);
}

const validateNumber = (value, key) => {
  if (typeof(value) === 'number') {
    return value
  }

  logger.warn(`User Class: value of ${ key } not accepted`);
  throw new Error(`User Class: value of ${ key } not accepted`);
}

const validateObject = (value, key) => {
  if (typeof(value) === 'object') {
    return value
  }

  logger.warn(`User Class: value of ${ key } not accepted`);
  throw new Error(`User Class: value of ${ key } not accepted`);
}

module.exports = (value, key) => {
  if (typeof(value) === 'boolean' || typeof(value) === 'number') {
    return value;
  }

  if (value) {
    return value;
  }

  logger.warn(`User Class: a(n) ${ key } value is required`);
  throw new Error(`a(n) ${ key } value is required`);
}

module.exports.validateString = validateString;
module.exports.validateBoolean = validateBoolean;
module.exports.validateNumber = validateNumber;
module.exports.validateObject = validateObject;
