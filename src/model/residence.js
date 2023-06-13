const logger = require('../logger');

const { Types } = require('mongoose');

const { 
  addResidence,
  updateResidence, 
  readResidence,
  deleteResidence,
} = require('../model/data/residence');

const checkValue = (value, key) => {
  if (typeof(value) === 'boolean') {
    return value;
  }

  if (value) {
    return value;
  }
  else {
    logger.warn(`User Class: a(n) "${ key }" value is required to create a residence`);
    throw new Error(`a(n) "${ key }" value is required to create a residence`);
  }
}

class Residence {
  constructor({ ...data }) {
    // We do not need to check for ID
    this._id = new Types.ObjectId(data._id);
 
    try {
      this.customerId = new Types.ObjectId(checkValue(data.customerId, 'customerId'));
      this.houseType = checkValue(data.houseType, 'house type');
      this.size = checkValue(data.size, 'size');
      this.empty = checkValue(data.empty, 'empty');
      this.furnished = checkValue(data.furnished, 'furnished');
      this.pet = checkValue(data.pet, 'pet');
      this.bedroom = checkValue(data.bedroom, 'bedroom');
      this.bathroom = checkValue(data.bathroom, 'bathroom');
      this.den = checkValue(data.den, 'den');
      this.frequency = checkValue(data.frequency, 'frequency');
      this.address = {
        streetAddress: data.address.streetAddress,
        unit: data.address.unit,
        postalCode : data.address.postalCode,
        city: data.address.city,
        province: data.address.province,
        country: data.address.country
      }
    } catch (err) {
      logger.warn("Residence class error [constructor]: missing required value");
      throw new Error(err.message);
    }
  }

  add() {
    return addResidence(this);
  }

  update() {
    return updateResidence(this);
  }

  delete() {
    return deleteResidence(this._id);
  }

  static async byId(customerId, id) {
    const data = await readResidence(customerId, id);

    if (!data) {
      logger.warn("Residence class error [byId]: residence with customerId and _id not found");
      throw new Error('residence with customerId and _id not found');
    }

    return new Residence(data);
  }
}

module.exports.Residence = Residence;
