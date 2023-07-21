const logger = require('../../../logger');

const { Booking } = require('../../../model/booking');

const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    return res.status(200).json(createSuccessResponse({
      booking: booking
    }));
  } catch (err) {
    return res.status(500).json(createErrorResponse(500, 'Something went wrong'));
  }
}
