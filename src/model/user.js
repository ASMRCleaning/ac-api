const bcrypt = require('bcrypt');

const logger = require('../logger');
const validate = require('./validate-value');

const { 
  createUser, 
  validateUser, 
  findByUsername 
} = require('./data/user');

class User {
  constructor({ ...data }) {
    this._id = data._id;

    try {
      this.username = validate(data.username, 'username');
      this.firstName = validate(data.firstName, 'first name');
      this.lastName = validate(data.lastName, 'last name');
      this.role = validate(data.role, 'role');
    } catch (err) {
      logger.warn("User Class error: missing required value");
      throw new Error(err.message);
    }

    if (data.password === data.password2) {
      // Generate a hash synchronously using hashSync
      // See: https://www.npmjs.com/package/bcryptjs#hashsyncs-salt
      this.password = bcrypt.hashSync(data.password, 10);
    } else {
      logger.warn("User Class error [constructor]: passwords do not match");
      throw new Error('Passwords do not match')
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
      logger.warn("User Class error [validate]: missing username or password");
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
      logger.warn("User Class error [byUsername]: missing username");
      throw new Error('Missing username');
    }
  }

  static byRole(role) {
    // TODO: create query to return user with a specified role
    return role;
  }

  register() {
    return createUser(this);
  }
}

module.exports.User = User;
