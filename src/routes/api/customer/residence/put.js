const logger = require('../../../../logger');

const { Residence } = require('../../../../model/residence');

const { createSuccessResponse, createErrorResponse } = require('../../../../response');

module.exports = async (req, res) => {
  try {
    const residenceId = req.params.id;
    const residenceData = req.body;

    // Create a new Residence instance with updated data
    const updatedResidence = new Residence({ _id: residenceId, ...residenceData });

    // Update the residence
    await updatedResidence.update();
    logger.info(`Residence ${residenceId} updated successfully!`);
    res.status(200).json(createSuccessResponse({ message: 'Residence updated successfully!' }));
  } catch (err) {
    logger.warn({ err }, 'PUT /customer/residence:id error: ' + err.message);
    res.status(500).json(createErrorResponse(500, err.message));
  }
};
