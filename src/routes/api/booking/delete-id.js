// Logging
const logger = require('../../../logger');

// Residence object
const { Booking } = require('../../../model/booking');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const booking = await Booking.byId(req.params.id);

    if (Object.keys(booking).length !== 0) {
      try {
        await Booking.delete(booking._id);
  
        return res.status(200).json(createSuccessResponse());
      } catch (err) {
        logger.warn({ err }, 'DELETE /booking' + err.message);
        return res.status(500).json(createErrorResponse(500, 'DELETE /booking' + err.message));
      }
    }
  } catch (err) {
    logger.warn({ err }, 'PUT /booking' + err.message);
    return res.status(404).json(createErrorResponse(404, err.message));
  }
}
