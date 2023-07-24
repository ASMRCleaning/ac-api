// Logging
const logger = require('../../../logger');

// Residence object
const { Booking } = require('../../../model/booking');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const booking = await Booking.byCustomer(req.user.userId);
    
    if (req.query.visitId) {
      const visit = booking.getVisit(req.query.visitId);

      if (!visit) {
        return res.status(404).json(
          createErrorResponse('GET /booking error: visitId not found')
        );
      }

      return res.status(200).json(
        createSuccessResponse({
          visit: visit
        })
      );
    }

    return res.status(200).json(
      createSuccessResponse({
        booking: booking
      })
    );
  } catch (err) {
    // Return a 500 error if anything goes wrong
    logger.warn({ err }, 'GET /booking' + err.message);
    return res.status(404).json(createErrorResponse(404, err.message));
  }
}
