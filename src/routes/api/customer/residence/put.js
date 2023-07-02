// src/routes/api/customer/residence/put.js

// Logging
const logger = require('../../../../logger');

// Residence object
const { Residence } = require('../../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../../response');

module.exports = async (req, res) => {
  try {
    const residenceId = req.params.id;
    const residenceData = req.body;

    // Determine whether the residence exists in the database
    const residence = await Residence.byId(residenceId, req.user.customerId);

    if (residence) {
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
      // Return a 404 response if there is no residence with the 
      logger.warn(`POST /customer/residence/:id residence with id (${ residenceId }) not found`);
      return res.status(404).json(
        createErrorResponse(404, `POST /customer/residence/:id residence with id (${ residenceId }) not found`));
    }
    
  } catch (err) {
    // Return a 500 response if anything goes wrong
    logger.warn({ err }, 'PUT /customer/residence:id error: ' + err.message);
    return res.status(500).json(createErrorResponse(500, err.message));
  }
};
