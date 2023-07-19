const logger = require('../../logger');

const { BookingModel } = require('./connection');

const getAllBookings = async() => {
  try {
    return await BookingModel.find().lean()
  } catch (err) {
    logger.warn({ err }, 'getAllBookings error: ' + err.message);
    throw new Error(err.message);
  }
};

const addBooking = async (data) => {
  try {
    // Prevent assigning of _id for MongoDB to automatically create it
    delete data['_id'];
    const booking = new BookingModel(data);
    await booking.save();
    return booking;
  } catch (err) {
    logger.warn({ err }, 'addBooking error: ' + err.message);
    throw new Error(err.message);
  }
};

const updateBooking = async (data) => {
  try {
    const { _id, ...details } = data;
    const booking = new BookingModel(data);
    const error = booking.validateSync();
  
    if (!error) {
      return await BookingModel.findByIdAndUpdate(_id, details, { new: true }).lean();
    } else {
      logger.warn('updateBooking error: ' + error);
      throw new Error(error);
    }
  } catch (err) {
    logger.warn({ err }, 'updateBooking error: ' + err.message);
    throw new Error(err.message);
  }
}

const deleteBooking = async (id) => {
  try {
    return await BookingModel.findByIdAndDelete(id).lean();
  } catch (err) {
    logger.warn({ err }, 'deleteResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

const findBookingById = async (id) => {
  try {
    return await BookingModel.findById(id).lean();
  } catch (err) {
    logger.warn({ err }, 'findBookingById error: ' + err.message);
    throw new Error(err.message);
  }
};

const findBooking = async (data) => {
  try {
    return await BookingModel.findOne({ ...data }).lean();
  } catch (err) {
    logger.warn({ err }, 'findBooking error: ' + err.message);
    throw new Error(err.message);
  }
};

const getAllCustomerBookingVisits = async (customerId) => {
  try {
    const booking = await BookingModel.findOne({ customerId: customerId }).lean();
    return booking.visit;
  } catch (err) {
    logger.warn({ err }, 'getAllCustomerBookingVisits error: ' + err.message);
    throw new Error(err.message);
  }
};

const getCustomerBookingVisitById = async (customerId, visitId) => {
  try {
    const visit = await BookingModel.findOne({ customerId: customerId }, { 
      _id: false,
      visit: {
        $elemMatch: { _id: visitId }
      }
    }).lean();

    return visit[0];
  } catch (err) {
    logger.warn({ err }, 'getCustomerBookingVisitById error: ' + err.message);
    throw new Error(err.message);
  }
}

const addVisit = async (customerId, data) => {
  try {
    const booking = await BookingModel.findOne({ customerId: customerId });
    booking.visits.push(data);
    return await booking.save();
  } catch (err) {
    logger.warn({ err }, 'addVisit error: ' + err.message);
    throw new Error(err.message);
  }
}

const updateVisit = async (customerId, visitId, data) => {
  try {
    const booking = await BookingModel.findOne({ customerId: customerId });
    const visit = booking.visits.find(visit => visit._id === visitId);
    visit.status = data.status;
    visit.date = data.date;
    await booking.save();
    return visit;
  } catch (err) {
    logger.warn({ err }, 'updateVisit error: ' + err.message);
    throw new Error(err.message);
  }
};

const deleteVisit = async (customerId, visitId) => {
  try {
    const booking = await BookingModel.findOne({ customerId: customerId });
    booking.visits.pop({ _id: visitId });
    await booking.save();
    return booking.visits;
  } catch (err) {
    logger.warn({ err }, 'updateVisit error: ' + err.message);
    throw new Error(err.message);
  }
};

module.exports.getAllBookings = getAllBookings;
module.exports.addBooking = addBooking;
module.exports.updateBooking = updateBooking;
module.exports.deleteBooking = deleteBooking;
module.exports.findBookingById = findBookingById;
module.exports.findBooking = findBooking;
module.exports.getAllCustomerBookingVisits = getAllCustomerBookingVisits;
module.exports.getCustomerBookingVisitById = getCustomerBookingVisitById;
module.exports.addVisit = addVisit;
module.exports.updateVisit = updateVisit;
module.exports.deleteVisit = deleteVisit;
