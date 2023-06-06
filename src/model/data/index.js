const { UserModel, CustomerModel }= require('./connection');

// const logger = require('../../logger');

const createUser = async (user) => {
  const model = new UserModel(user);
  await model.save();
  const newUser = await UserModel.findOne({ username: user.username }).exec();
  const customer = new CustomerModel({ 
    userId: newUser._id, 
    firstName: user.firstName, 
    lastName: user.lastName
  });
  await customer.save();
}

module.exports.createUser = createUser;
