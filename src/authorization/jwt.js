const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const logger = require('../logger');

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
      _id: jwt_payload._id,
      userName: jwt_payload.userName,
    });
  } else {
    next(null, false);
  }
}); 

module.exports.authenticate = () => passport.authenticate('jwt', { session: false });
