const bcrypt = require('bcrypt');

const logger = require('../logger');

// Validator helper functions
const { validateString } = require('./validate-value');

const { 
  createUser, 
  validateUser, 
  findByUsername,
  findUserById } = require('./data/user');

class User {
  constructor({ ...data }) {
    // NOTE: _id is treated as the User ID
    this._id = data?._id ? data?._id : {};

    try {
      this.username = validateString(data.username, 'username');
      this.firstName = validateString(data.firstName, 'first name');
      this.lastName = validateString(data.lastName, 'last name');
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

  /**
   *
   * @param {string} username
   */
  static async byUsername(username) {
    if (username) {
      return await findByUsername(username);
    } else {
      logger.warn('User Class error [byUsername]: missing username');
      throw new Error('Missing username');
    }
  }

  /**
   * Search for the user document in the database by the given User ID and Role ID
   * @param {string} userId requestor User ID
   * @param {string} roleId requester Role ID
   */
  static async byId(userId, roleId) {
    // Find the user
    const data = await findUserById(userId, roleId);

    // Throw an error if no user is found
    if (!data) {
      logger.warn('User class error [byId]: user not found');
      throw new Error('User class error [byId]: user not found');
    }

    // Create a User object
    const user = new User(data);
    
    // Remove the _id and password properties for security
    delete user['_id'];
    delete user['password'];

    return user;
  }

  register() {
    return createUser(this);
  }
}

module.exports.User = User;
