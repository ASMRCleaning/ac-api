const logger = require('../../logger');

const { Types } = require('mongoose');

const { ResidenceModel } = require('./connection');

const getAllResidences = async () => {
  try {
    return await ResidenceModel.find().lean();
  } catch (err) {
    logger.warn({ err }, 'getAllResidences error: ' + err.message);
    throw new Error(err.message);
  }
};

const addResidence = async (data) => {
  try {
    // Prevent assigning of _id for MongoDB to automatically create it
    delete data['_id'];
    const residence = new ResidenceModel(data);
    await residence.save();
  } catch (err) {
    logger.warn({ err }, 'addResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

const updateResidence = async (data) => {
  try {
    const { _id, ...details } = data;
    await ResidenceModel.findByIdAndUpdate(_id, details);
  } catch (err) {
    logger.warn({ err }, 'updateResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

const findResidenceById = async (id) => {
  try {
    return await ResidenceModel.findById(id).lean();
  } catch (err) {
    logger.warn({ err }, 'readResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

const deleteResidence = async (residence) => {
  try {
    const { _id } = residence;
    await ResidenceModel.findByIdAndDelete(_id);
  } catch (err) {
    logger.warn({ err }, 'deleteResidence error: ' + err.message);
    throw new Error(err.message);
  }
};

module.exports.getAllResidences = getAllResidences;
module.exports.addResidence = addResidence;
module.exports.updateResidence = updateResidence;
module.exports.findResidenceById = findResidenceById;
module.exports.deleteResidence = deleteResidence;
