// src/mode/customer.js

// Logging
const logger = require('../logger');

// Validate the passed value
const validate = require('./validate-value');

// This is used to create a MongoDB ObjectID type
const { Types } = require('mongoose');

// Query helper functions using Mongoose
const { 
  addCustomer, 
  updateCustomer,
  findById 
} = require('./data/customer');

class Customer {
  constructor({ id, userId, firstName, lastName }) {
    // The _id of the Customer object is MongoDB ObjectID type
    this._id = id;

    // If a userId, firstName, and lastName 
    // is empty, then do not create a Customer object
    try {
      this.userId = validate(userId, 'userId');
      this.firstName = validate(firstName, 'first name');
      this.lastName = validate(lastName, 'last name');
    } catch (err) {
      logger.warn('Customer Class error: missing required value');
      throw new Error(err.message);
    }
  }

  /**
   * Add the current customer to the database
   * @returns Promise<void>
   */
  add() {
    return addCustomer(this);
  }

  /**
   * Update the information of the current customer to the database
   * @returns Promise<void>
   */
  update() {
    return updateCustomer(this);
  }

  /**
   * Set's the current customer's first name and last name
   * @param {Object} data
   * @returns void
   */
  setData(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  /**
   * Search for a customer by ID in the database
   * @param {int} id 
   * @returns Promise<Customer>
   */
  static async byId(id) {
    const data = await findById(id);

    // If there is no customer with the id then throw an error
    if (!data) {
      throw new Error(`Customer Class error: customer with id ${ id } not found`)
    }

    const customer = new Customer({
      id: data._id,
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName
    });

    return customer;
  }
}

module.exports.Customer = Customer;
