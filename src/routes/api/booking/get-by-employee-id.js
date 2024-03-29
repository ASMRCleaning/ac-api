// Logging
const logger = require('../../../logger');

// Residence object
const { Booking } = require('../../../model/booking');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const data = await Booking.byEmployee(req.params.id, req.query.bookingId);
    
    return res.status(200).json(createSuccessResponse({
      bookings: data
    }));
  } catch (err) {
    // Return a 500 error if anything goes wrong
    logger.warn({ err }, 'GET booking/:id' + err.message);
    return res.status(404).json(createErrorResponse(404, err.message));
  }
}
