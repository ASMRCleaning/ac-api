const logger = require('../logger');

const { createErrorResponse } = require('../response');

module.exports = () => {
  return function (req, res, next) {
   if ('employeeId' in req.user) {
    next();
   } else {
    return res.status(401).json(createErrorResponse(401, 'Unauthorized'));
   }
  }
}
