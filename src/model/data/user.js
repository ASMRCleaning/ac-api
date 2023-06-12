const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const logger = require('../../logger');

const { UserModel, CustomerModel } = require('./connection');

const createUser = async (user) => {
  try {
    const newUser = new UserModel(user);
    await newUser.save();
    const document = await UserModel.findOne({ username: user.username }).lean();
    const customer = new CustomerModel({ 
      userId: document._id, 
      firstName: user.firstName, 
      lastName: user.lastName
    });
    await customer.save();
  } catch (err) {
    logger.warn({ err }, "createUser Error: ", err.message);
    throw new Error(err.message);
  }
}

const validateUser = async (username, password) => {
  const document = await UserModel.findOne({ username: username }).lean();

  if (document) {
    const match = await bcrypt.compare(password, document.password)

    if (match) {
      const payload = {
        username: document.username,
        role: document.role
      }
      
      return jwt.sign(payload, process.env.JWT_SECRET);
    }
  } else {
    return document;
  }
}

module.exports.createUser = createUser;
module.exports.validateUser = validateUser;
