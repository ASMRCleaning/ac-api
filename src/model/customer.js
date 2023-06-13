const logger = require('../logger');
const validate = require ('./validate-value');
const {
  addCustomer,
  updateCustomer,
} = require('./data/customer');

class Customer {
  constructor({ id, userId, firstName, lastName }) {
    this._id = id;

    try {
      this.userId = validate(userId, 'userId');
      this.firstName = validate(firstName, 'first name');
      this.lastName = validate(lastName, 'last name');
    } catch (err) {
      logger.warn("Customer Class error: missing required value");
      throw new Error(err.message);
    }
  }

  add() {
    return addCustomer(this);
  }

  update() {
    return updateCustomer(this);
  }
}

module.exports.Customer = Customer;
