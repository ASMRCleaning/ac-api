const logger = require('../logger');
const validate = require('./validate-value');

const {
  getAllResidences,
  addResidence,
  updateResidence,
  findResidenceById,
  deleteResidence,
} = require('../model/data/residence');

class Residence {
  constructor({ ...data }) {
    // We do not need to check for ID when creating a new instance
    this._id = data._id;

    try {
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
        streetAddress: data.address.streetAddress,
        unit: data.address.unit,
        postalCode: data.address.postalCode,
        city: data.address.city,
        province: data.address.province,
        country: data.address.country,
      };
    } catch (err) {
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

  update() {
    return updateResidence(this);
  }

  delete() {
    return deleteResidence(this._id);
  }

  static async byId(id) {
    const data = await findResidenceById(id);

    // If there is no residence with the id then throw an error
    if (!data) {
      logger.warn(`Residence class error [byId]: residence with id ${ id } not found`);
      throw new Error(`Residence class error [byId]: residence with id ${ id } not found`);
    }

    return new Residence(data);
  }
}

module.exports.Residence = Residence;
