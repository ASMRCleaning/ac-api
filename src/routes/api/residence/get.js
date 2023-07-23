// src/routes/api/customer/residence/get.js

// Logging
const logger = require('../../../logger');

// Residence object
const { Residence } = require('../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // Find the residence with the matching customerId
    const residence = await Residence.byCustomerId(customerId);
    
    // Return the matching residence. This will return an empty Residence object
    // if no residence is found
    return res.status(200).json(
      createSuccessResponse({
        residence: residence
      })
    );
  } catch (err) {
      // Return a 500 response if anything goes wrong
      logger.warn({ err }, 'GET /customer/residence:id error: ' + err.message);
      return res.status(500).json(createErrorResponse(500, err.message));
  }
}
