const logger = require('../../logger');

const { ResidenceModel } = require('./connection');

const getAllResidences = async () => {
  try {
    return await ResidenceModel.find().lean();
  } catch (err) {
    logger.warn({ err }, 'getAllResidences error: ' + err.message);
    throw new Error(err.message);
  }
};

/**
 * Create a residence in the database
 * @param {Object} data residence data
 * @returns Promise<Object>
 */
const addResidence = async (data) => {
  try {
    // Prevent assigning of _id for MongoDB to automatically create it
    delete data['_id'];
    const residence = new ResidenceModel(data);
    await residence.save();
    return residence;
  } catch (err) {
    logger.warn({ err }, 'addResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

/**
 * Update the residence document in the database
 * @param {Object} data
 * @returns Promise<Object>
 */
const updateResidence = async (data) => {
  try {
    // Extract the _id and customerId while assigning everything else in "details"
    const { _id, ...details } = data;
    // Create ResidenceModel to validate values before updating in the database
    const residence = new ResidenceModel(data);
    // Validate values synchronously
    const error = residence.validateSync();

    if (!error) {
      // If there are no validation errors, attempt to update the residence in the database
      return await ResidenceModel.findByIdAndUpdate(_id, details, { new: true }).lean();
    } else {
      // Throw an error if there are any validation errors
      logger.warn('updateResidence error: ' + error);
      throw new Error(error);
    }
  } catch (err) {
    // Throw an error if updating fails
    logger.warn({ err }, 'updateResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

/**
 * Find the residence by _id in the database
 * @param {string} id _id of the residence
 * @returns Promise<Object>
 */
const findResidenceById = async (id) => {
  try {
    return await ResidenceModel.findById(id).lean();
  } catch (err) {
    logger.warn({ err }, 'readResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

/**
 * Find a residence with the given customerId in the database
 * @param {string} customerId customerId tied to the residence 
 * @returns Promise<Object>
 */
const findResidenceByCustomerId = async (customerId) => {
  try {
    return await ResidenceModel.findOne({ customerId: customerId }).lean();
  } catch (err) {
    logger.warn({ err }, 'readResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

/**
 * Delete the residence from the database with the given id
 * @param {string} id _id of the residence document
 * @returns Promise<Object>
 */
const deleteResidence = async (id) => {
  try {
    return await ResidenceModel.findByIdAndDelete(id).lean();
  } catch (err) {
    logger.warn({ err }, 'deleteResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

module.exports.getAllResidences = getAllResidences;
module.exports.addResidence = addResidence;
module.exports.updateResidence = updateResidence;
module.exports.findResidenceById = findResidenceById;
module.exports.findResidenceByCustomerId = findResidenceByCustomerId;
module.exports.deleteResidence = deleteResidence;
