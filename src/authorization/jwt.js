const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const logger = require('../logger');
const authorize = require('./authorization-middleware');

// Configure JSON Web Token options
const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET
};

logger.info('Configured to use JWT for authorization');

module.exports.strategy = () => new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  if (jwt_payload) {
    // The following will ensure that all routes using
    // passport.authenticate have a req.user._id, req.user.userName
    // that matches the request payload data
    next(null, {
      username: jwt_payload.username,
      role: jwt_payload.role
    });
  } else {
    next(null, false);
  }
}); 

module.exports.authenticate = () => authorize('jwt');
