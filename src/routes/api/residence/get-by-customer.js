// src/routes/api/customer/residence/get.js

// Logging
const logger = require('../../../logger');

// Residence object
const { Residence } = require('../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    // Find the residence with the matching customerId
    const residence = await Residence.byCustomer(req.params.id);
    
    // Return the matching residence. This will return an empty Residence object
    // if no residence is found
    return res.status(200).json(
      createSuccessResponse({
        residence: residence
      })
    );
  } catch (err) {
    logger.warn({ err }, 'GET /residence:id error: ' + err.message);
    return res.status(404).json(createErrorResponse(404, err.message));
  }
}
