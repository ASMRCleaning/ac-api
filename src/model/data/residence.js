const logger = require('../../logger');

const { ResidenceModel } = require('./connection');

const addResidence = async (residence) => {
  try {
    const document = new ResidenceModel(residence);
    await document.save();
  } catch (err) {
    logger.warn({ err }, "addResidence error: " + err.message);
    throw new Error(err.message);
  }
}

const updateResidence = async (residence) => {
  try {
    const { _id, ...data }  = residence;
    await ResidenceModel.findByIdAndUpdate(_id, { ...data });
  } catch (err) {
    logger.warn({ err }, "updateResidence error: " + err.message);
    throw new Error(err.message);
  }
}

const writeResidence = async (data) => {
  try {
    const { _id, ...residence } = data;
    await ResidenceModel.findByIdAndUpdate(_id, residence, { upsert: true });
  } catch (err) {
    logger.warn({ err }, "writeResidence error: " + err.message);
    throw new Error(err.message);
  }
}

const deleteResidence = async (residence) => {
  try {
    const { _id, ...data } = residence;
    await ResidenceModel.findByIdAndDelete(_id, { ...data });
  } catch (err) {
    logger.warn({ err }, "deleteResidence error: " + err.message);
    throw new Error(err.message);
  }
}

module.exports.addResidence = addResidence;
module.exports.updateResidence = updateResidence;
module.exports.writeResidence = writeResidence;
module.exports.deleteResidence = deleteResidence;
