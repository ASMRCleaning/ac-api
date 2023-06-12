const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const logger = require('../../logger');

const { UserModel, CustomerModel } = require('./connection');

const createUser = async (data) => {
  try {
    const newUser = new UserModel(data);
    await newUser.save();
    const document = await UserModel.findOne({ username: data.username }).lean();
    const customer = new CustomerModel({ 
      userId: document._id, 
      firstName: data.firstName, 
      lastName: data.lastName
    });
    await customer.save();
  } catch (err) {
    logger.warn({ err }, "createUser Error: ", err.message);
    throw new Error(err.message);
  }
}

const validateUser = async (username, password) => {
  try {
    const document = await UserModel.findOne({ username: username }).lean();

    if (document) {
      const match = await bcrypt.compare(password, document.password)
  
      if (match) {
        let payload = {
          userId: document._id,
          username: document.username,
          role: document.role
        }

        // TODO: get the the appropriate ID if the user is a manager/regular employee
        if (document.role === 'customer') {
          const customer = await CustomerModel.findOne({ userId: document._id });
          logger.info(customer);
          payload['customerId'] = customer._id;
        }
        
        return jwt.sign(payload, process.env.JWT_SECRET);
      }
    } else {
      return document;
    }
  } catch (err) {
    logger.warn({ err }, "validateUser Error: ", err.message);
    throw new Error(err.message);
  }
}

module.exports.createUser = createUser;
module.exports.validateUser = validateUser;
