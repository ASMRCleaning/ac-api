const logger = require('../logger');

const { writeResidence } = require('../model/data/residence');

const checkValue = (value, key) => {
  if (value) {
    return value;
  } else {
    logger.warn(`User Class: a ${ key } is required to create a residence`);
    throw new Error(`a ${ key } is required to create a residence`);
  }
}

class Residence {
  constructor({ ...data }) {
    // We do not need to check for ID
    this._id = data._id;
 
    try {
      this.customerId = checkValue(data.customerId, 'customerId');
      this.houseType = checkValue(data.houseType, 'house type');
      this.size = checkValue(data.size, 'size');
      this.empty = checkValue(data.empty, 'empty');
      this.furnished = checkValue(data.furnished, 'furnished');
      this.pet = checkValue(data.pet, 'pet');
      this.bedroom = checkValue(data.bedroom, 'bedroom');
      this.bathroom = checkValue(data.bathroom, 'bathroom');
      this.den = checkValue(data.den, 'den');

      // We will not check for address for the time being 
      this.address = data.address;
    } catch (err) {
      logger.warn("Residence class error [constructor]: missing required value");
      throw new Error(err.message);
    }
  }

  add() {
    return writeResidence(this);
  }
}

module.exports.Residence = Residence;
