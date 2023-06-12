const passport = require('passport');
const logger = require('../logger');


const { createErrorResponse } = require('../response');

module.exports = (strategyName) => {
  return function (req, res, next) {
    function callback(err, user) {
      if (err) {
        logger.warn({ err }, 'error authenticating user');
        return next(createErrorResponse(500, 'Unable to authenticate user'));
      }
    
      if (!user) {
        return res.status(401).json(createErrorResponse(401, 'Unauthorized'));
      }

      req.user = user;
      next();
    }

    passport.authenticate(strategyName, { session: false }, callback)(req, res, next);
  }
}
