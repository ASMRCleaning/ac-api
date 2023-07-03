// src/model/residence.js

// Logging
const logger = require('../logger');

// Validate the passed value
const validate = require('./validate-value');

// Query helper functions using Mongoose for ResidenceModel
const {
  getAllResidences,
  addResidence,
  updateResidence,
  findResidenceById,
  deleteResidence,
} = require('../model/data/residence');

class Residence {
  constructor({ ...data }) {
    // The _id of the Residence object is MongoDB ObjectID type
    this._id = data._id;

    // Attempt to assign the property values of the object
    try {
      // The customerID of the Residence object is MongoDB ObjectID type
      this.customerId = validate(data.customerId, 'customerId');
      this.houseType = validate(data.houseType, 'house type');
      this.size = validate(data.size, 'size');
      this.empty = validate(data.empty, 'empty');
      this.furnished = validate(data.furnished, 'furnished');
      this.pet = validate(data.pet, 'pet');
      this.bedroom = validate(data.bedroom, 'bedroom');
      this.bathroom = validate(data.bathroom, 'bathroom');
      this.den = validate(data.den, 'den');
      this.frequency = validate(data.frequency, 'frequency');
      this.address = {
        streetAddress: data?.address?.streetAddress,
        unit: data?.address?.unit,
        postalCode: data?.address?.postalCode,
        city: data?.address?.city,
        province: data?.address?.province,
        country: data?.address?.country,
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
  setData({...data }) {
    // Assign the values of the properties if it is passed,
    // otherwise, assign the previous value
    this.houseType = data?.houseType ?? this.houseType;
    this.size = data?.size ?? this.size;
    this.empty = data?.empty ?? this.empty;
    this.furnished = data?.furnished ?? this.furnished;
    this.pet = data?.pet ?? this.pet;
    this.bedroom = data?.bedroom ?? this.bedroom;
    this.bathroom = data?.bathroom ?? this.bathroom;
    this.den = data?.den ?? this.den;
    this.frequency = data?.frequency ?? this.frequency;
    this.address = {
      streetAddress: data?.address?.streetAddress ?? this.address.streetAddress,
      unit: data?.address?.unit ?? this.address.unit,
      postalCode: data?.address?.postalCode ?? this.address.postalCode,
      city: data?.address?.city ?? this.address.city,
      province: data?.address?.province ?? this.address.province,
      country: data?.address?.country ?? this.address.country,
    };
  }

  /**
   * Search for the residence document in the database
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
}

module.exports.Residence = Residence;
