// src/model/booking.js

// Logging
const logger = require('../logger');

// Validator helper functions
const { validateString } = require('./validate-value');

const {
  getAllBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getCustomerBooking,
  getEmployeeBookings
} = require('../model/data/booking');

/**
 * Iteratively set the values of an object with the passed data
 * @param {Object} obj 
 * @param {Object} data 
 * @returns void
 */
const set = (obj, data) => {
  try {
    for (const property in data) {
      // TODO: This loop is O(n). Make it better
      for (let member in obj) {
        if (member === property) {
          if (typeof(obj[member]) === 'string') {
            obj[member] = validateString(data[property], property);
          }
        }
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

class Booking {
  constructor({ ...data }) {
    // NOTE: _id is treated as the Booking ID
    this._id = data?._id ? data?._id : null;
    this.employeeId = data?.employeeId ? data?.employeeId : null;
    this.customerId = data?.customerId ? data?.customerId : null;

    try {
      this.status = validateString(data.status, 'status');
      this.serviceType = validateString(data.serviceType, 'serviceType');
      this.startDate = validateString(data.startDate, 'startDate');
      this.endDate = validateString(data.endDate, 'endDate');
    } catch (err) {
      logger.warn('Booking class error [constructor]: ' + err.message);
      throw new Error(err.message);
    }

    this.specification = data.specification ? data.specification : "";

    try {
      if (data?.visits) {
        this.visits = [];

        data.visits.forEach(visit => {
          for (const detail in visit) {
            validateString(visit[detail], detail);
          }

          this.visits.push(visit);
        });
      } else {
        this.visits = [];
      }
    } catch (err) {
      logger.warn('Booking class error [constructor]: ' + err.message);
      throw new Error(err.message);
    }
  }

  static async getAll() {
    return getAllBookings;
  }

  add() {
    return addBooking(this);
  }

  update() {
    return updateBooking(this);
  }

  static async delete(id) {
    return deleteBooking(id);
  }

  addVisit(data) {
    try {
      for (const property in data) {
        validateString(data[property], property);
      }

      this.visits.push(data);
    } catch (err) {
      logger.warn('Booking class error [addVisit]: ' + err.message);
      throw new Error(err.message);
    }
  }

  updateVisit(data) {
    const { _id } = data;
    const index = this.visits.findIndex(visit => visit._id === _id);

    if (index > -1) {
      try {
        for (const property in data) {
          validateString(data[property], property);
        }

        this.visits[index] = data;
      } catch (err) {
        logger.warn('Booking class error [addVisit]: ' + err.message);
        throw new Error(err.message);      
      }
    } else {
      logger.warn('Booking class error [updateVisit]: visit with _id does not exists');
      throw new Error('Booking class error [updateVisit]: visit with _id does not exists');
    }
  }

  deleteVisit(id) {  
    const index = this.visits.findIndex(visit => visit._id === id);

    if (index > -1) {
      this.visits.splice(index, 1);
    }
  }

  setData(data) {
    const { visits, ...rest } = data;

    try {
      set(this, rest);
      
      for (const visit in visits) {
        for (const detail in visits[visit]) {
          validateString(visits[visit][detail]);
        }

        this.visits.push(visit);
      }
    } catch (err) {
      logger.warn(`Booking class error [setData]: ${ err.message }`);
      throw new Error(`Booking class error [setData]: ${ err.message }`);
    }
  }

  static async byId(id) {
    const data = await getBookingById(id);

    if (!data) {
      logger.warn('Booking class error [byId]: booking with _id not found');
      throw new Error('Booking class error [byId]: booking with _id not found');
    }

    return new Booking(data);
  }

  static async byCustomer(customerId) {
    const data = await getCustomerBooking(customerId);

    if (!data) {
      logger.warn('Booking class error [byCustomerId]: booking with customerId not found');
      throw new Error('Booking class error [byCustomerId]: booking with customerId not found');
    }

    return new Booking(data);
  }

  static async byEmployee(employeeId) {
    const data = await getEmployeeBookings(employeeId);

    if (!data) {
      logger.warn('Booking class error [byEmployee]: booking(s) with employeeId not found');
      throw new Error('Booking class error [byEmployee]: booking(s) with employeeId not found');
    }

    return data
  }
}

module.exports.Booking = Booking;
