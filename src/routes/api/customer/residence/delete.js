// src/routes/api/customer/residence/delete.js

// Logging
const logger = require('../../../../logger');

// Residence object
const { Residence } = require('../../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../../response');

module.exports = async (req, res) => {
  try {
    const customerId = req.user.customerId;

    // Determine whether the residence exists in the database by the given customerId
    const residence = await Residence.byCustomerId(customerId);

    // Delete the residence in the database
    await Residence.delete(residence._id, customerId);

    return res.status(200).json(createSuccessResponse());
  } catch (err) {
      // Return a 404 response if there is no residence with the _id and customerId
      // or if anything goes wrong
      logger.warn('DELETE /customer/residence/:id error: residence with _id and customerId not found');
      return res.status(404).json(
        createErrorResponse(404, 'POST /customer/residence/:id error: residence with _id and customerId not found'));
  }
};
