const logger = require('../../logger');

const { CustomerModel } = require('./connection');

const addCustomer = async (data) => {
  try {
    // Prevent passing _id for MongoDB to automatically create it
    delete data['_id'];
    const customer = new CustomerModel(data);
    await customer.save();
    return customer;
  } catch (err) {
    logger.warn({ err }, 'addCustomer error: ' + err.message);
    throw new Error(err.message);
  }
};

const updateCustomer = async (data) => {
  try {
    // Extract the _id and userId while assigning everything else in "details"
    const { _id, userId, ...details } = data;
    // Create CustomerModel to validate values before updating in the database
    const customer = new CustomerModel(data);
    // Validate values synchronously
    const error = customer.validateSync();

    // If there are no validation errors, attempt to update the residence in the database
    if (!error) {
      return await CustomerModel.findOneAndUpdate(
        {
          // Use _id and userId as the filter
          _id: _id,
          userId: userId
        },
        details,
        {
          // return the document after it has been updated
          returnDocument: 'after'
        }).lean();
    }

  } catch (err) {
    logger.warn({ err }, 'updateCustomer error: ' + err.message);
    throw new Error(err.message);
  }
};

const findCustomerById = async (id, userId) => {
  try {
    return await CustomerModel.findOne({_id: id, userId: userId}).lean();
  } catch (err) {
    logger.warn({ err }, 'findById error: ' + err.message);
    throw new Error(err.message);
  }
}

module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.findCustomerById = findCustomerById;
