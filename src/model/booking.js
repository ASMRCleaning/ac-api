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

// const getWeeksBetweenDates = (startDate, endDate) => {
//   // Calculate the difference in milliseconds between the two dates
//   const diffInMs = endDate - startDate;

//   // Convert milliseconds to weeks
//   const msInWeek = 1000 * 60 * 60 * 24 * 7;
//   const weeks = diffInMs / msInWeek;

//   // Round down to get the whole number of weeks
//   return Math.floor(weeks);
// } 

class Booking {
  constructor({ ...data }) {
    // NOTE: _id is treated as the Booking ID
    this._id = data?._id ? data?._id : null;
    this.employeeId = data?.employeeId ? data?.employeeId : null;
    this.customerId = data?.customerId ? data?.customerId : null;
    this.residenceId = data?.residenceId ? data?.residenceId : null;

    try {
      this.status = validateString(data.status, 'status');
      this.serviceType = validateString(data.serviceType, 'serviceType');
      this.frequency = validateString(data.frequency, 'frequency');
      this.startDate = validateString(new Date(data.startDate).toISOString(), 'startDate');
      this.endDate = validateString(new Date(data.endDate).toISOString(), 'endDate');
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
            if (detail !== '_id')
              validateString(visit[detail], detail);
          }

          this.visits.push(visit);
        });
      } else {
        this.visits = [{
          status: "scheduled",
          date: this.startDate
        }];

        if (this.frequency !== 'once') {
          let workingDate = new Date(data.startDate);
          const endDate = new Date(data.endDate);
          
          while (workingDate < endDate) {
            let tmp = new Date(workingDate);

            if (this.frequency === 'weekly' || this.frequency === 'bi-weekly') {
              const days = this.frequency === 'weekly' ? 7 : 14;
              tmp.setDate(workingDate.getDate() + days);

              // if (tmp < endDate) {
              //   obj['date'] = tmp.toISOString();
              // } else {
              //   obj['date'] = endDate.toISOString();
              // }
            } else if (this.frequency === 'monthly') {
              tmp.setMonth(workingDate.getMonth() + 1);
            }

            if (tmp < endDate) {
              this.visits.push({
                status: "scheduled",
                date: tmp.toISOString()
              });
            }
            
            workingDate = new Date(tmp);
          }
        }
        // const diff = getWeeksBetweenDates(start, end);
      }
    } catch (err) {
      logger.warn('Booking class error [constructor]: ' + err.message);
      throw new Error(err.message);
    }
  }

  static getAll() {
    return getAllBookings();
  }

  getVisit(id) {
    return this.visits.find(visit => visit._id == id);
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

  updateVisit(id, data) {
    const index = this.visits.findIndex(visit => visit._id == id);

    if (index > -1) {
      try {
        for (const property in data) {
          validateString(data[property], property);
          this.visits[index][property] = data[property]
        }
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
    const index = this.visits.findIndex(visit => visit._id == id);

    if (index > -1) {
      this.visits.splice(index, 1);
    }
  }

  setData(data) {
    // We do not allow changing of "visit"
    delete data['visits']

    try {
      set(this, data);
      // for (const visit in visits) {
      //   for (const detail in visits[visit]) {
      //     validateString(visits[visit][detail]);
      //   }

      //   this.visits.push(visit);
      // }
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

  static async byEmployee(employeeId, bookingId) {
    const data = await getEmployeeBookings(employeeId);

    if (!data) {
      logger.warn('Booking class error [byEmployee]: booking(s) with employeeId not found');
      throw new Error('Booking class error [byEmployee]: booking(s) with employeeId not found');
    }

    if (bookingId) {
      return data.find(visit => visit._id == bookingId);
    }

    return data
  }
}

module.exports.Booking = Booking;
