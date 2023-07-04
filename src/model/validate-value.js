const logger = require('../logger');

const validateString = (value, key) => {
  if (typeof(value) === 'string') {
      return value
  }

  logger.warn(`value of ${ key } not accepted`);
  throw new Error(`value of ${ key } not accepted`);
}

const validateBoolean = (value, key) => {
  if (typeof(value) === 'boolean') {
    return value
  } 

  logger.warn(`value of ${ key } not accepted`);
  throw new Error(`value of ${ key } not accepted`);
}

const validateNumber = (value, key) => {
  if (typeof(value) === 'number') {
    return value
  }

  logger.warn(`value of ${ key } not accepted`);
  throw new Error(`value of ${ key } not accepted`);
}

const validateObject = (value, key) => {
  if (typeof(value) === 'object') {
    return value
  }

  logger.warn(`value of ${ key } not accepted`);
  throw new Error(`value of ${ key } not accepted`);
}

module.exports.validateString = validateString;
module.exports.validateBoolean = validateBoolean;
module.exports.validateNumber = validateNumber;
module.exports.validateObject = validateObject;
