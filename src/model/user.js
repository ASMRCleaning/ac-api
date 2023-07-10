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
      logger.warn('User Class error: missing required value');
      throw new Error(err.message);
    }

    if (data?.password && data?.password2) {
      if (data.password === data.password2) {
        // Generate a hash synchronously using hashSync
        // See: https://www.npmjs.com/package/bcryptjs#hashsyncs-salt
        this.password = bcrypt.hashSync(data.password, 10);
      } else {
        logger.warn('User Class error [constructor]: passwords do not match');
        throw new Error('Passwords do not match');
      }
    } else {
      this.password = null;
    }
  }

  register() {
    return createUser(this);
  }

  update() {
    return updateUser(this);
  }

  /**
   *
   * @param {string} username
   * @param {string} password
   * @returns {string}
   */
  static async validate(username, password) {
    if (username && password) {
      return await validateUser(username, password);
    } else {
      logger.warn('User Class error [validate]: missing username or password');
      throw new Error('Missing username or password');
    }
  }

  setData(data) {
    // Assign the values of the properties if it is passed,
    // otherwise, assign the previous value
    try {
      if (!("password" in data) && !("username" in data)) {
        for (const value in data) {
          for (let prop in this) {
            if (prop === value) {
              this[prop] = validateString(data[value], prop);
            }
          }
        }
      } else {
        logger.warn('User Class error [setData]: cannot set username or password');
        throw new Error('User Class error [setData]: cannot set username or password');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async byId(userId) {
    // Find the user
    const data = await findUserById(userId);

    // Throw an error if no user is found
    if (!data) {
      logger.warn('User class error [byId]: user not found');
      throw new Error('User class error [byId]: user not found');
    }

    // Create a User object
    const user = new User(data);
    
    // Remove the password property for security
    delete user['password'];

    return user;
  }
}

module.exports.User = User;
