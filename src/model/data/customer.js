const logger = require('../../logger');

const { CustomerModel } = require('./connection');

const addCustomer = async (data) => {
  try {
    // Prevent passing _id for MongoDB to automatically create it
    delete data['_id'];
    const customer = new CustomerModel(data);
    await customer.save();
  } catch (err) {
    logger.warn({ err }, 'addCustomer error: ' + err.message);
    throw new Error(err.message);
  }
};

const updateCustomer = async (data) => {
  try {
    const { _id, ...details } = data;
    await CustomerModel.findByIdAndUpdate(_id, details);
  } catch (err) {
    logger.warn({ err }, 'updateResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

const findById = async (id) => {
  try {
    return await CustomerModel.findById(id);
  } catch (err) {
    logger.warn({ err }, 'findById error: ' + err.message);
    throw new Error(err.message);
  }
}

module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.findById = findById;
