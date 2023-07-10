// src/model/employee.js

// Logging
const logger = require('../logger');

// Validator helper function
const { validateString } = require('./validate-value');

// Query helper functions for using Mongoose for EmployeeModel
const { 
  addEmployee, 
  updateEmployee, 
  findEmployeeById } = require('./data/employee');

const { User } = require('./user');

class Employee {
  constructor({ id, userId, firstName, lastName, email, phone }) {
    // NOTE: _id is treated as the Employee ID
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
   * Add the current employee to the database
   * @returns Promise<void>
   */
  add() {
    return addEmployee(this);
  }

  /**
   * Update the information of the current customer to the database
   * @returns Promise<void>
   */
  update() {    return updateEmployee(this);
  }

  /**
   * Set's the current customer's first name and last name
   * @param {Object} data
   */
  setData(data) {
    // Assign the values of the properties if it is passed,
    // otherwise, assign the previous value
    try {
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
   * Search for a employee by ID in the database
   * @param {string} id employee _id
   * @param {string} userId user id attached to the employee
   * @returns Promise<Employee>
   */
  static async byId(id, userId) {
    const data = await findEmployeeById(id, userId);

    // If there is no employee with the id then throw an error
    if (!data) {
      logger.warn('Employee Class class error [byId]: employee with _id and userId not found');
      throw new Error(`Employee Class class error [byId]: employee with _id and userId not found`)
    }

    const customer = new Employee({
      id: data._id,
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName
    });

    return customer;
  }

  /**
   * Determine whether the requestor is a manager or not
   * @param {string} userId user id of the requestor 
   * @param {string} roleId role id of the requestor
   * @returns {boolean}
   */
  static async isManager(userId, roleId) {
    try {
      // Check whether user exists
      const user = await User.byId(userId, roleId);
      
      // If the user is a manager return true otherwise false
      return user.role === 'manager' ? true : false;
    } catch (err) {
      // Throw an error if anything goes wrong
      throw new Error(err.message)
    }
  }
}

module.exports.Employee = Employee
