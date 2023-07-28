// Logging
const logger = require('../../../logger');

// Customer object
const { User } = require('../../../model/user');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const user = await User.byId(req.user.userId);

    user.setPassword(req.body.password, req.body.password2);
    await user.update();
  
    return res.status(200).json(createSuccessResponse());
  } catch (err) {
    logger.warn({ err }, 'PUT /user error: ' + err.message);
    return res.status(404).json(createErrorResponse(404, err.message));
  }
};
