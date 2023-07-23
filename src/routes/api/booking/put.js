// Logging
const logger = require('../../../logger');

// Residence object
const { Booking } = require('../../../model/booking');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const booking = await Booking.byCustomer(req.user.userId);

    if (Object.keys(booking).length !== 0) {
      try {
        booking.setData(req.body);
        const update = await booking.update();
  
        return res.status(200).json(
          createSuccessResponse({
            booking: update
          })
        );
      } catch (err) {
        logger.warn({ err }, 'PUT /booking' + err.message);
        return res.status(400).json(createErrorResponse(400, err.message));
      }
    }
  } catch (err) {
    logger.warn({ err }, 'PUT /booking' + err.message);
    return res.status(404).json(createErrorResponse(404, err.message));
  }
}
