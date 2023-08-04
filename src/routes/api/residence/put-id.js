// src/routes/api/customer/residence/put.js

// Logging
const logger = require('../../../logger');

// Residence object
const { Residence } = require('../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const residence = await Residence.byId(req.params.id);

    // Set the residence data
    residence.setData(req.body);
    // Update the residence data in the database
    const update = await residence.update();

    // Return the updated data
    return res.status(200).json(
      createSuccessResponse({
        residence: update,
      })
    );
  } catch (err) {
    logger.warn({ err }, 'PUT /residence error: ' + err.message);
    return res.status(500).json(createErrorResponse(500, err.message));
  }
};
