const logger = require('../logger');

const bcrypt = require('bcrypt');

const { createUser } = require('./data');

const checkValue = (value, key) => {
  if (value) {
    return value;
  } else {
    logger.warn(`User Class: a ${ key } is required to create a user`);
    throw new Error(`User Class: a ${ key } is required to create a user`);
  }
}

class User {
  constructor({ username, firstName, lastName, password, password2, role }) {
    try {
      this.username = checkValue(username, 'username');
      this.firstName = checkValue(firstName, 'firstName');
      this.lastName = checkValue(lastName, 'lastName');
      this.role = checkValue(role, 'role');
    } catch (err) {
      throw new Error(err);
    }

    if (password === password2) {
      // Generate a hash synchronously using hashSync
      // See: https://www.npmjs.com/package/bcryptjs#hashsyncs-salt
      this.password = bcrypt.hashSync(password, 10);
    } else {
      throw new Error('Passwords do not match')
    }
  }

  async initialize() {

  }

  /**
   * 
   * @param {string} username 
   * @returns Promise<User>
   */
  static async byUsername(username) {
    return username;
  }

  static async byRole(role) {
    return role
  }

  register() {
    return createUser(this);
  }
}

module.exports.User = User;
