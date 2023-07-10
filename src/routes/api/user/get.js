// src/routes/api/customer/get.js

// Logging
const logger = require('../../../logger');

// User object
const { User } = require('../../../model/user');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res)  => {
  try {
    const userId = req.user.userId;
  
    // Find the user by the given userId and role id
    const user = await User.byId(userId);
    
    res.status(200).json(
      createSuccessResponse({
        user: user,
      })
    );
  } catch (err) {
    // Throw a 404 response if no user is found
    logger.warn({ err }, 'GET /customer error: ' + err.message);
    return res.status(404).json(createErrorResponse(404, err.message));
  }
}
