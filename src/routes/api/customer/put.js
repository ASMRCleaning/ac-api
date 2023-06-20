const logger = require('../../../logger');
const { Customer } = require('../../../model/customer');

const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customerData = req.body;

    const customer = new Customer({ id: customerId, ...customerData });
    await customer.update();

    logger.info(`Customer ${customerId} updated successfully!`);
    res.status(200).json(createSuccessResponse({ message: 'Customer updated successfully!' }));
  } catch (err) {
    logger.warn({ err }, 'PUT /customer/:id error: ' + err.message);
    res.status(500).json(createErrorResponse(500, err.message));
  }
};
