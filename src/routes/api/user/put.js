// src/routes/api/user/put.js

// Logging
const logger = require('../../../logger');

// Customer object
const { User } = require('../../../model/user');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userData = req.body;

    // Determine whether the customer exists. This will be an empty object
    // if no user is found
    const user = await User.byId(userId);

    if (Object.keys(user).length !== 0) {
      // Set the customer data. This is limited to first name and last name
      user.setData(userData);
      // Update the customer data in the database 
      const update = await user.update();
    
      // Return the updated data
      return res.status(200).json(
        createSuccessResponse({  
          user: update,
        })
      );
    } else {
      // Return a 204 if no user is found
      logger.warn(`PUT /user warning: user not found`);
      return res.status(204).send();
    }
  } catch (err) {
    // If anything goes wrong return 500 response with the proper message
    logger.warn({ err }, 'PUT /user error: ' + err.message);
    return res.status(500).json(createErrorResponse(500, err.message));
  }
};
