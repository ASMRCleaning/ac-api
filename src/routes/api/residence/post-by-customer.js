// src/routes/api/customer/residence/post.js

// Logging
const logger = require('../../../logger');

// Residence object
const { Residence } = require('../../../model/residence');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    // Include the customerId when creating a Residence object
    const residenceData = { 
      customerId: req.params.id, 
      ...req.body 
    };

    // Create a new Residence instance
    const newResidence = new Residence(residenceData);

    // Add the residence in the database
    const document = await newResidence.add();

    // Return a 201 response with the Residence object on success
    return res.status(201).json(createSuccessResponse({ 
      residence: document
    }));
  } catch (err) {
    // Return a 500 error if anything goes wrong
    logger.warn({ err }, 'POST /residence' + err.message);
    return res.status(500).json(createErrorResponse(500, err.message));
  }
};
