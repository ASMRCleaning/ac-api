const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../../logger');

const { UserModel } = require('./connection');

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
        const payload = { userId: document._id, role: document.role };

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

/**
 * Find the user and their data by _id and customer/manager/employee id in the database
 * @param {string} userId user id
 * @param {string} roleId customer/manager/employee id
 * @returns Object
 */
const findUserById = async (userId) => {
  try {
    // Find the user in the database
    const user = await UserModel.findById(userId).lean();

    return user;
  } catch (err) {
    // Throw an error if anything goes wrong
    logger.warn({ err }, 'findUserById error: ' + err.message);
    throw new Error(err.message);
  }
}

const updateUser = async (data) => {
  try {
    const user = new UserModel(data);
    const error = user.validateSync();

    if (!error) {
      return await UserModel.findByIdAndUpdate(data._id, data, { new: true }).lean();
    }
  } catch (err) {
    logger.warn({ err }, 'updateUser error: ' + err.message);
    throw new Error(err.message);
  }
}

module.exports.createUser = createUser;
module.exports.validateUser = validateUser;
module.exports.findUserById = findUserById;
module.exports.updateUser = updateUser;
