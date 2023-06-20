const logger = require('../../../logger');

const { Residence } = require('../../../model/residence');
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const residenceData = req.body;

    // Create a new Residence instance
    const newResidence = new Residence(residenceData);

    // Add the residence
    await newResidence.add();

    logger.info('Residence created successfully!');
    res.status(201).json(createSuccessResponse({ message: 'Residence created successfully!' }));
  } catch (err) {
    logger.warn({ err }, 'POST /residence' + err.message);
    res.status(500).json(createErrorResponse(500, err.message));
  }
};
