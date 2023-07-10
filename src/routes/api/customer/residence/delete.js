// src/routes/api/customer/residence/delete.js

// Logging
const logger = require('../../../../logger');

// Residence object
const { Residence } = require('../../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../../response');

module.exports = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // Determine whether the residence exists in the database by the given customerId
    const residence = await Residence.byCustomerId(customerId);

    if (Object.keys(residence).length !== 0) {
      // Delete the residence in the database
      await Residence.delete(residence._id, customerId);

      return res.status(200).json(createSuccessResponse());
    } else {
      // Return a 204 response if there is no residence with the customerId
      logger.warn('DELETE /customer/residence warning: residence with customerId not found');
      return res.status(204).send();
    }
  } catch (err) {
      // Return a 500 response if anything goes wrong
      logger.warn('DELETE /customer/residence/:id error: ' + err.message);
      return res.status(500).json(
        createErrorResponse(500, 'DELETE /customer/residence/:id error: ' + err.message));
  }
};
