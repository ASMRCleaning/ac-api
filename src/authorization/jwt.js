const passportJWT = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const logger = require('../logger');
const authorize = require('./authorization-middleware');
const roleAuthenticate = require('./role-middleware');

// Configure JSON Web Token options
const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET
};

logger.info('Configured to use JWT for authorization');

module.exports.strategy = () => new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  if (jwt_payload) {
    let user = {
      userId: jwt_payload.userId,
    }

    if (jwt_payload['customerId']) {
      user['customerId'] = jwt_payload.customerId;
    } else if (jwt_payload['employeeId']) {
      user['employeeId'] = jwt_payload.employeeId;
    } else if (jwt_payload['managerId']) {
      user['managerId'] = jwt_payload.managerId;
    } else {
      logger.error('Missing customerId/employeeId/managerId in payload');
      throw new Error('Missing customerId/employeeId/managerId in payload');
    }

    // The following will ensure that all routes using
    // passport.authenticate have a req.user.userId and user role id
    // that matches the request payload data
    next(null, user);
  } else {
    next(null, false);
  }
}); 

module.exports.authenticate = () => authorize('jwt');
module.exports.roleAuthenticate = () => roleAuthenticate();
