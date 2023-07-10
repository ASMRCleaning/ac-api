// src/routes/api/customer/residence/get.js

// Logging
const logger = require('../../../../logger');

// Residence object
const { Residence } = require('../../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../../response');

module.exports = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // Determine whether the residence exists in the database using the customerId
    const residence = await Residence.byCustomerId(customerId);
  
    // if (residence) {
        // Return the updated data
        return res.status(200).json(
          createSuccessResponse({
            residence: residence
          })
        );
    // } else {
    //   // If there is no residence with a matching customer id then throw an error
    //   logger.warn('GET /customer/residence/:id error: residence with customerId not found');
    //   return res.status(404).json(
    //     createErrorResponse(404, 'GET /customer/residence/:id error: residence with customerId not found'));  
    // }
  } catch (err) {
      // Return a 500 response if anything goes wrong
      logger.warn({ err }, 'GET /customer/residence:id error: ' + err.message);
      return res.status(500).json(createErrorResponse(500, err.message));
  }
}
