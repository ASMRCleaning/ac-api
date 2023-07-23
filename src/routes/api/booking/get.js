// Logging
const logger = require('../../../logger');

// Residence object
const { Booking } = require('../../../model/booking');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const booking = await Booking.byCustomer(req.user.userId);

    return res.status(200).json(
      createSuccessResponse({
        booking: booking
      })
    );
  } catch (err) {
    // Return a 500 error if anything goes wrong
    logger.warn({ err }, 'GET /booking' + err.message);
    return res.status(500).json(createErrorResponse(500, err.message));
  }
}
