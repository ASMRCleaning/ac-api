// src/routes/api/customer/put.js

// Logging
const logger = require('../../../logger');

// Customer object
const { Customer } = require('../../../model/customer');

// Use response template for sending response bodies
const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const customerId = req.user.customerId;
    const customerData = req.body;

    // Determine whether the customer exists
    const customer = await Customer.byId(customerId);

    if (customer) {
      // Set the customer data. This is limited to first name and last name
      customer.setData(customerData);
      // Update the customer data in the database 
      const update = await customer.update();
    
      // Return the updated data
      return res.status(200).json(
        createSuccessResponse({  
          customer: update,
        })
      );
    } else {
      // Return a 404 response if there is no customer with the given id
      logger.warn(`PUT /customer customer with id (${ customerId }) not found`);
      return res.status(404).json(
        createErrorResponse(404, `PUT /customer customer with id (${ customerId }) not found`));
    }
  } catch (err) {
    // If anything goes wrong return 400 response with the proper message
    logger.warn({ err }, 'PUT /customer error: ' + err.message);
    return res.status(500).json(createErrorResponse(500, err.message));
  }
};
