const logger = require('../../../logger');

const { Booking } = require('../../../model/booking');

const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const bookingData = {
      customerId: req.user.userId,
      ...req.body
    };

    const booking = new Booking(bookingData);
    const document = await booking.add();

    return res.status(200).json(createSuccessResponse({
      booking: document
    }));
  } catch (err) {
    logger.warn({ err }, 'POST /booking' + err.message);
    return res.status(500).json(createErrorResponse(500, err.message));
  }
}
