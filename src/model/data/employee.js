// src/model/data/employee.js

const logger = require('../../logger');

const { EmployeeModel } = require('./connection');

const addEmployee = async (data) => {
  try {
    // Prevent passing _id for MongoDB to automatically create it
    delete data['_id'];
    const employee = new EmployeeModel(data);
    await employee.save();
    return employee;
  } catch (err) {
    logger.warn({ err }, 'addEmployee error: ' + err.message);
    throw new Error(err.message);
  }
}

const updateEmployee = async (data) => {
  try {
    // Extract the _id and userId while assigning everything else in "details"
    const { _id, userId, ...details } = data;
    // Create EmployeeModel to validate values before updating in the database
    const employee = new EmployeeModel(data);
    // Validate values synchronously
    const error = employee.validateSync();

    // If there are no validation errors, attempt to update the residence in the database
    if (!error) {
      return await EmployeeModel.findOneAndUpdate(
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
    logger.warn({ err }, 'updateEmployee error: ' + err.message);
    throw new Error(err.message);
  }
};

const findEmployeeById = async (id, userId) => {
  try {
    return await EmployeeModel.findOne({_id: id, userId: userId}).lean();
  } catch (err) {
    logger.warn({ err }, 'EmployeeModel error: ' + err.message);
    throw new Error(err.message);
  }
}

module.exports.addEmployee = addEmployee;
module.exports.updateEmployee = updateEmployee;
module.exports.findEmployeeById = findEmployeeById;
