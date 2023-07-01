const logger = require('../logger');
const validate = require('./validate-value');

const { 
  addCustomer, 
  updateCustomer,
  findById } = require('./data/customer');

class Customer {
  constructor({ id, userId, firstName, lastName }) {
    this._id = id;

    try {
      this.userId = validate(userId, 'userId');
      this.firstName = validate(firstName, 'first name');
      this.lastName = validate(lastName, 'last name');
    } catch (err) {
      logger.warn('Customer Class error: missing required value');
      throw new Error(err.message);
    }
  }

  add() {
    return addCustomer(this);
  }

  update() {
    return updateCustomer(this);
  }

  static async byId(id) {
    const data = await findById(id);

    if (!data) {
      throw new Error(`Customer Class error: customer with id ${ id } not found`)
    }

    const customer = new Customer({
      _id: data._id,
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName
    });

    return customer;
  }
}

module.exports.Customer = Customer;
