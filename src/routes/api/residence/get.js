const logger = require('../../../logger');

const { Residence } = require('../../../model/residence');
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const residences = await Residence.getAll();
    res.status(200).json(createSuccessResponse(residences));
  } catch (err) {
    logger.warn({ err }, 'GET /residence' + err.message);
    res.status(500).json(createErrorResponse(500, err.message));
  }
};
