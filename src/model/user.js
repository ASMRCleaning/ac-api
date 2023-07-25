const bcrypt = require('bcrypt');

const logger = require('../logger');

// Validator helper functions
const { validateString } = require('./validate-value');

const { 
  createUser,
  updateUser,
  validateUser,
  findUserById } = require('./data/user');

class User {
  constructor({ ...data }) {
    // NOTE: _id is treated as the User ID
    this._id = data?._id ? data?._id : {};

    try {
      this.username = validateString(data.username, 'username');
      this.firstName = validateString(data.firstName, 'first name');
      this.lastName = validateString(data.lastName, 'last name');
      this.email = validateString(data.email, 'email');
      this.phone = validateString(data.phone, 'phone');
      this.role = validateString(data.role, 'role');
    } catch (err) {
      // Throw an error if validation fails
      logger.warn('User Class error [constructor]: ' + err.message);
      throw new Error(err.message);
    }

    if (data?.password && data?.password2) {
      if (data.password === data.password2) {
        // Generate a hash synchronously using hashSync
        // See: https://www.npmjs.com/package/bcryptjs#hashsyncs-salt
        this.password = bcrypt.hashSync(data.password, 10);
      } else {
        // Throw an error if passwords do not match
        logger.warn('User Class error [constructor]: passwords do not match');
        throw new Error('Passwords do not match');
      }
    } else {
      this.password = null;
    }
  }

  /**
   * Create/register the current user in the database
   * @returns Promise<Object>
   */
  register() {
    return createUser(this);
  }

  /**
   * Update the current object in the database
   * @returns Promise<Object>
   */
  update() {
    return updateUser(this);
  }

  /**
   * Validate if username and password match
   * @param {string} username user username
   * @param {string} password user password
   * @returns Promise<Object>
   */
  static async validate(username, password) {
    if (username && password) {
      return await validateUser(username, password);
    } else {
      logger.warn('User Class error [validate]: missing username or password');
      throw new Error('Missing username or password');
    }
  }

  /**
   * Set the data of the current User object with the passed data
   * @param {Object} data 
   */
  setData(data) {
    // Assign the values of the properties if it is passed,
    // otherwise, assign the previous value
    try {
      // Password, username, and role must not be changed
      // TODO: create a separate function(s) to change the password and/or username
      if (!("password" in data) && !("username" in data) && !("role" in data)) {
        for (const value in data) {
          for (let prop in this) {
            if (prop === value) {
              this[prop] = validateString(data[value], prop);
            }
          }
        }
      } else {
        // Throw an error if username and/or password included in the data
        logger.warn('User Class error [setData]: cannot set username or password');
        throw new Error('User Class error [setData]: cannot set username or password');
      }
    } catch (err) {
      // Throw the validation error
      throw new Error(err.message);
    }
  }

  /**
   * Find the user by the given userId
   * @param {string} userId _id of the user in the database
   * @returns User
   */
  static async byId(userId) {
    // Find the user
    const data = await findUserById(userId);

    if (data) {
      // Create a User object
      const user = new User(data);
      
      // Remove the password property for security
      delete user['password'];

      return user;
    } else {
      logger.warn('User Class error [byId]: cannot find user');
      throw new Error('User Class error [byId]: cannot find user');
    }
  }
}

module.exports.User = User;
