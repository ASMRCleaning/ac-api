// src/mode/customer.js

// Logging
const logger = require('../logger');

// Validator helper function
const { validateString } = require('./validate-value');

// Query helper functions using Mongoose for CustomerModel
const { 
  addCustomer, 
  updateCustomer,
  findCustomerById 
} = require('./data/customer');

class Customer {
  constructor({ id, userId, firstName, lastName, email, phone }) {
    // NOTE: the _id is treated as the Customer ID
    this._id = id ? id : {};
    this.userId = userId ? userId : {};

    // If a userId, firstName, and lastName 
    // is empty, then do not create a Customer object
    try {
      this.firstName = validateString(firstName, 'first name');
      this.lastName = validateString(lastName, 'last name');
      this.email = validateString(email, 'email');
      this.phone = validateString(phone, 'phone');
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
   */
  setData(data) {
    // Assign the values of the properties if it is passed,
    // otherwise, assign the previous value
    try {
      // const keys = Object.keys(data);

      // keys.forEach(key => {
      //   if (key === 'firstName') {
      //     this.firstName = validateString(data.firstName, key);
      //   }
  
      //   if (key === 'lastName') {
      //     this.lastName = validateString(data?.lastName, key);
      //   }
      // });
      
      for (const value in data) {
        for (let prop in this) {
          if (prop === value) {
            this[prop] = validateString(data[value], prop);
          }
        }
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Search for a customer by ID in the database
   * @param {string} id customer _id
   * @param {string} userId user id attached to the customer
   * @returns Promise<Customer>
   */
  static async byId(id, userId) {
    const data = await findCustomerById(id, userId);

    // If there is no customer with the id then throw an error
    if (!data) {
      logger.warn('Customer Class class error [byId]: customer with _id and userId not found');
      throw new Error(`Customer Class class error [byId]: customer with _id and userId not found`)
    }

    const customer = new Customer({
      id: data._id,
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });

    return customer;
  }
}

module.exports.Customer = Customer;
