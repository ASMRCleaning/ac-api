// src/routes/api/customer/get.js

// Logging
const logger = require('../../../logger');

// User object
const { User } = require('../../../model/user');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res)  => {
  try {
    const user = await User.byId(req.params.id);
    
    // Return the found user. This will return an empty User object
    // if no user is found
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
