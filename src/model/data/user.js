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
      // Compare passwords
      const match = await bcrypt.compare(password, document.password);

      if (match) {
        // Create a payload to be signed
        const payload = { userId: document._id, role: document.role };

        // Sign the payload into a JSON Web Token
        return jwt.sign(payload, process.env.JWT_SECRET);
      }
    } else {
      // Document will be null if there is no matching user in the database,
      // return the null
      return document;
    }
  } catch (err) {
    // Throw an error if anything goes wrong
    logger.warn({ err }, 'validateUser Error: ', err.message);
    throw new Error(err.message);
  }
};

/**
 * Find the user and their user data by _id in the database
 * @param {string} userId user id
 * @returns Promise<Object>
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

/**
 * Update the current user with the passed data
 * @param {Object} data new user data
 * @returns Promise<Object>
 */
const updateUser = async (data) => {
  try {
    // Create a MongoDB User model with the passed data
    const user = new UserModel(data);
    // Validate whether passed data adheres to the schema rules
    const error = user.validateSync();

    if (!error) {
      // If there are no errors update the user in the database
      return await UserModel.findByIdAndUpdate(data._id, data, { new: true }).lean();
    } else {
      // If validation fails, throw an error
      logger.warn('updateUser error: ' + error);
      throw new Error(error);
    }
  } catch (err) {
    // Throw an error if anything goes wrong
    logger.warn({ err }, 'updateUser error: ' + err.message);
    throw new Error(err.message);
  }
}

module.exports.createUser = createUser;
module.exports.validateUser = validateUser;
module.exports.findUserById = findUserById;
module.exports.updateUser = updateUser;
