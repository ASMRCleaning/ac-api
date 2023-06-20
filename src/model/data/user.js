const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../../logger');

// const logger = require('../../logger');

const createUser = async (user) => {
  const newUser = new UserModel(user);
  await newUser.save();
  const document = await UserModel.findOne({ username: user.username }).lean();
  const customer = new CustomerModel({ 
    userId: document._id, 
    firstName: user.firstName, 
    lastName: user.lastName
  });
  await customer.save();
}

const validateUser = async (username, password) => {
  try {
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

  return user;
};

module.exports.createUser = createUser;
module.exports.validateUser = validateUser;
module.exports.findByUsername = findByUsername;
