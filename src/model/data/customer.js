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
    const { _id, ...details } = data;
    // Prevent updating the userId of the document
    delete details['userId'];
    // Return the updated document from the database
    return await CustomerModel.findByIdAndUpdate(
      _id, 
      details,
      { returnDocument: 'after' }).lean();
  } catch (err) {
    logger.warn({ err }, 'updateCustomer error: ' + err.message);
    throw new Error(err.message);
  }
};

const findCustomerById = async (id) => {
  try {
    return await CustomerModel.findById(id).lean();
  } catch (err) {
    logger.warn({ err }, 'findById error: ' + err.message);
    throw new Error(err.message);
  }
}

module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.findCustomerById = findCustomerById;
