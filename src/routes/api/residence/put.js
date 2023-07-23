// src/routes/api/customer/residence/put.js

// Logging
const logger = require('../../../logger');

// Residence object
const { Residence } = require('../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const residenceData = req.body;

    // Determine whether the residence exists in the database using the customerId
    const residence = await Residence.byCustomerId(customerId);

    // Update the residence object if it is not empty
    if (Object.keys(residence).length !== 0) {
      // Set the residence data
      residence.setData(residenceData);
      // Update the residence data in the database
      const update = await residence.update();
      
      // Return the updated data
      return res.status(200).json(
        createSuccessResponse({
          residence: update
        })
      );
    } else {
      // Return a 204 response if there is no residence with the customerId
      logger.warn('POST /customer/residence warning: residence with customerId not found');
      return res.status(204).send();
    }
  } catch (err) {
    // Return a 500 response if anything goes wrong
    logger.warn({ err }, 'PUT /customer/residence error: ' + err.message);
    return res.status(500).json(createErrorResponse(500, err.message));
  }
};
