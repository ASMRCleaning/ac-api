const logger = require('../../../../logger');

const { Residence } = require('../../../../model/residence');

const { createSuccessResponse, createErrorResponse } = require('../../../../response');

module.exports = async (req, res) => {
  try {
    const residenceId = req.params.id;
    await Residence.deleteById(residenceId);

    logger.info(`Residence ${residenceId} deleted successfully!`);
    res
      .status(200)
      .json(createSuccessResponse({ message: `Residence ${residenceId} deleted successfully!` }));
  } catch (err) {
    logger.warn({ err }, 'DELETE /customer/residence:id error: ' + err.message);
    res.status(500).json(createErrorResponse(500, err.message));
  }
};
