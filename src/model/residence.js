// src/model/residence.js

// Logging
const logger = require('../logger');

// Validator helper functions
const {
  validateString,
  validateBoolean,
  validateNumber
} = require('./validate-value')

// Query helper functions using Mongoose for ResidenceModel
const {
  getAllResidences,
  addResidence,
  updateResidence,
  findResidenceById,
  findResidenceByCustomerId,
  deleteResidence,
} = require('../model/data/residence');

/**
 * Iteratively set the values of an object with the passed data
 * @param {Object} obj 
 * @param {Object} data 
 * @returns void
 */
const set = (obj, data) => {
  try {
    for (const property in data) {
      for (let member in obj) {
        if (member === property) {
          if (typeof(obj[member]) === 'string') {
            obj[member] = validateString(data[property], property);
          } else if (typeof(obj[member]) === 'boolean') {
            obj[member] = validateBoolean(data[property], property);
          } else if (typeof(obj[member]) === 'number') {
            obj[member] = validateNumber(data[property], property);
          }
        }
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

class Residence {
  constructor({ ...data }) {
    // NOTE: _id is treated as the Residence ID
    this._id = data?._id ? data?._id : {};
    this.customerId = data?.customerId ? data?.customerId : {};

    // Attempt to assign the property values of the object
    try {
      this.houseType = validateString(data.houseType, 'house type');
      this.size = validateNumber(data.size, 'size');
      this.empty = validateBoolean(data.empty, 'empty');
      this.furnished = validateBoolean(data.furnished, 'furnished');
      this.pet = validateBoolean(data.pet, 'pet');
      this.bedroom = validateNumber(data.bedroom, 'bedroom');
      this.bathroom = validateNumber(data.bathroom, 'bathroom');
      this.den = validateNumber(data.den, 'den');
      this.frequency = validateString(data.frequency, 'frequency');

      // Assign am empty string if any of the address properties are not passed
      this.address = {
        streetAddress: data?.address?.streetAddress ? data?.address?.streetAddress : "",
        unit: data?.address?.unit ? data?.address?.unit : "",
        postalCode: data?.address?.postalCode ? data?.address?.postalCode : "",
        city: data?.address?.city ? data?.address?.city : "",
        province: data?.address?.province ? data?.address?.province : "",
        country: data?.address?.country ? data?.address?.country : "",
      };
    } catch (err) {
      // Object is not created if the properties are empty and throw and error
      logger.warn('Residence class error [constructor]: missing required value');
      throw new Error(err.message);
    }
  }

  static async getAll() {
    return getAllResidences();
  }

  add() {
    return addResidence(this);
  }

  /**
   * Update the matching residence document in the database with the current
   * Residence object
   * @returns Promise<Object>
   */
  update() {
    return updateResidence(this);
  }

  /**
   * Delete the residence data for the given _id and customerId
   * @returns Promise<Object>
   */
  static async delete(id, customerId) {
    return deleteResidence(id, customerId);
  } 

  /**
   * Set the properties of the residence object
   * @param {Object} data
   */
  setData(data) {
    // Deconstruct to retrieve "address" object
    const { address, ...rest } = data;

    // Attempt to set the data
    try {
      set(this, rest);
      set(this.address, address);
    } catch (err) {
      // If any thing goes wrong throw an error
      logger.warn(`Residence class error [setData]: ${ err.message }`);
      throw new Error(`Residence class error [setData]: ${ err.message }`);
    }
  }

  /**
   * Search for the residence document in the database using _id and customerId
   * @param {string} id residence _id
   * @param {string} customerId customer id attached to the residence
   * @returns 
   */
  static async byId(id, customerId) {
    const data = await findResidenceById(id, customerId);

    // If there is no residence with the id then throw an error
    if (!data) {
      logger.warn('Residence class error [byId]: residence with _id and customerId not found');
      throw new Error('Residence class error [byId]: residence with _id and customerId not found');
    }

    return new Residence(data);
  }

  static async byCustomerId(customerId) {
    const data = await findResidenceByCustomerId(customerId);

    // If there is no residence with a matching customer id then throw an error
    if (!data) {
      logger.warn('Residence class error [byId]: residence with _id and customerId not found');
      throw new Error('Residence class error [byId]: residence with _id and customerId not found');
    }

    return new Residence(data);
  }
}

module.exports.Residence = Residence;
