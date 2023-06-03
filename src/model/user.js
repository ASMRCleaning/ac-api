// const { Schema } = require('mongoose');

// const userSchema = new Schema({
//   username: {
//     type: String,
//     unique: true
//   },
//   password: String,
//   role: Number
// });

// class User {
//   static async findByUserName(usr) {
//     return await this.findOne({ username: usr });
//   }

//   static async findByRole(r) {
//     return await this.find({ role: r });
//   }

//   static async registerUser(password1, password2) {
//     if (password1 !== password2) {
//       throw new Error('passwords did not match');
//     }
//   }
// }

// userSchema.loadClass(User);

// module.exports = userSchema;

const logger = require('../logger')

const { createUser } = require('./data');

class User {
  constructor({ username }) {
    this.username = username;
  }

  /**
   * 
   * @param {string} username 
   * @returns Promise<User>
   */
  static async findUserByUsername(username) {
    return;
  }

  static async findByRole(role) {
    return;
  }

  register() {
    logger.info('in user');
    return createUser(this);
  }
}

module.exports.User = User;
