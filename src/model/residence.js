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

class Residence {
  constructor({ ...data }) {
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

      // Initially assign empty values for address
      this.address = {
        streetAddress: "",
        unit: "",
        postCode: "",
        city: "",
        province: "",
        country: ""
      };

      // If address is passed, assign the values (if any)
      if (data?.address) {
        this.address = {
          streetAddress: data?.address?.streetAddress,
          unit: data?.address?.unit,
          postalCode: data?.address?.postalCode,
          city: data?.address?.city,
          province: data?.address?.province,
          country: data?.address?.country,
        };
      }
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
  setData({...data }) {
    // Assign the values of the properties if it is passed
    try {
      for (const property in data) {
        for (let member in this) {
          if (member === property) {
            if (typeof(this[member]) === 'string') {
              this[member] = validateString(data[property], property);
            } else if (typeof(this[member]) === 'boolean') {
              this[member] = validateBoolean(data[property], property);
            } else if (typeof(this[member]) === 'number') {
              this[member] = validateNumber(data[property], property);
            }
          }
        }
      } 
    } catch (err) {
      throw new Error(err.message);
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
