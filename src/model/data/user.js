const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../../logger');

const { 
  UserModel, 
  CustomerModel, 
  EmployeeModel } = require('./connection');

/**
 * Create a user and the corresponding "role" model
 * @param {object} data new user data
 */
const createUser = async ({ ...data }) => {
  try {
    // Prevent passing _id for MongoDB to automatically create it
    delete data['_id'];
    // Create a User model
    const newUser = new UserModel(data);
    // Save the new user in the database
    await newUser.save();

    let RoleModel;

    // If the passed role is a customer create a Customer model
    // and vice versa
    switch (data.role) {
      case 'customer':
        RoleModel = CustomerModel;
        break;
      case 'employee':
        RoleModel = EmployeeModel;
        break;
    }

    // const document = await UserModel.findOne({ username: data.username }).lean();
    const customer = new RoleModel({
      userId: newUser._id,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    // We do not return anything
    await customer.save();
  } catch (err) {
    logger.warn({ err }, 'createUser Error: ', err.message);
    throw new Error(err.message);
  }
};

/**
 * Validate the user and return a signed JWT token
 * @param {*} username username of the user
 * @param {*} password password of the user
 * @returns {string} return the signed JWT token
 */
const validateUser = async (username, password) => {
  try {
    // Find if a user with the username exists
    const document = await UserModel.findOne({ username: username }).lean();

    if (document) {
      
      const match = await bcrypt.compare(password, document.password);

      if (match) {
        let payload = {
          userId: document._id
        };

        // The payload will contain a customerId if the user is a customer
        // or an employeeId if the user is an employee
        if (document.role === 'customer') {
          const customer = await CustomerModel.findOne({ userId: document._id });
          payload['customerId'] = customer._id;
        } else if (document.role === 'employee') {
          const employee = await EmployeeModel.findOne({ userId: document._id });
          payload['employeeId'] = employee._id;
        }

        return jwt.sign(payload, process.env.JWT_SECRET);
      }
    } else {
      return document;
    }
  } catch (err) {
    logger.warn({ err }, 'validateUser Error: ', err.message);
    throw new Error(err.message);
  }
};

const findByUsername = async (username) => {
  const user = await UserModel.findOne({ username: username }).lean();

  if (user) {
    const customer = await CustomerModel.findOne({ userId: user._id }).lean();
    return customer;
  }

  return user;
};

/**
 * Find the user and their data by _id and customer/manager/employee id in the database
 * @param {string} userId user id
 * @param {string} roleId customer/manager/employee id
 * @returns Object
 */
const findUserById = async (userId, roleId) => {
  try {
    // Find the user in the database
    const user = await UserModel.findOne({ _id: userId }).lean();

    if (user) {
      // TODO: include condition for manager and employee

      // Holder for a customer/manager/employee document
      let entity;

      // If the found user in the database is a customer return a User object
      if (user.role === 'customer') {
        // Find the corresponding customer document in the database
        entity = await CustomerModel.findOne(
          { 
            _id: roleId, 
            userId: user._id 
          }).lean();
      }

      // Return a formatted data if a customer/manager/employee is found
      if (entity) {
        const data = {
          username: user.username,
          firstName: entity.firstName,
          lastName: entity.lastName,
          role: user.role
        }
  
        return data;
      }
    }

    // Return a null if nothing is found
    return;
  } catch (err) {
    // Throw an error if anything goes wrong
    logger.warn({ err }, 'findUserById error: ' + err.message);
    throw new Error(err.message);
  }
}

module.exports.createUser = createUser;
module.exports.validateUser = validateUser;
module.exports.findByUsername = findByUsername;
module.exports.findUserById = findUserById;
