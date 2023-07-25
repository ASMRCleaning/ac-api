// src/routes/api/customer/get.js

// Logging
const logger = require('../../../logger');

// User object
const { User } = require('../../../model/user');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res)  => {
  try {
    const users = await User.getAll(req.query.role);
    
    res.status(200).json(
      createSuccessResponse({
        users: users,
      })
    );
  } catch (err) {
    logger.warn({ err }, 'GET /customer error: ' + err.message);
    return res.status(404).json(createErrorResponse(404, err.message));
  }
}
