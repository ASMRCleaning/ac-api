// src/routes/api/get-info.js

const logger = require('../../../logger');

const { User } = require('../../../model/user');

const { createSuccessResponse, createErrorResponse } = require('../../../response');

module.exports = async (req, res) => {
  try {
    const user = await User.byUsername(req.params.username);

    return res.status(200).json(createSuccessResponse({
      ...user
    }));
  } catch (err) {
    logger.warn({ err }, 'GET /customer/:username error: ' + err.message);
    return res.status(404).json(
      createErrorResponse(404, 'GET /customer/:username error: ' + err.message));
  }
};
