const logger = require('../../logger');

const { createSuccessResponse, createErrorResponse } = require('../../response');

const { User } = require('../../model/user');

module.exports = async (req, res) => {
  try {
    // Create a User object with the passed data
    const user = new User(req.body);
    // Create the user in the database
    await user.register();
    
    // Return a 201 if the user is created
    return res.status(201).json(createSuccessResponse({
      message: 'User created'
    }));
  } catch (err) {
    // Throw a 500 if anything goes wrong
    logger.error({ err }, 'POST /register error: ' + err.message);
    return res.status(500).json(
      createErrorResponse(500, err.message));
  }
}
