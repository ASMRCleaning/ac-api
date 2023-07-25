// src/routes/api/customer/residence/delete.js

// Logging
const logger = require('../../../logger');

// Residence object
const { Residence } = require('../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    // Look for the residence in the database by the given customerId
    const residence = await Residence.byId(req.params.id);

    // Delete the residence in the database
    await Residence.delete(residence._id);

    return res.status(200).json(createSuccessResponse());
  } catch (err) {
    logger.warn('DELETE /residence/:id error: ' + err.message);
    return res.status(404).json(
      createErrorResponse(404, 'DELETE /residence/:id error: ' + err.message));
  }
};
