const { Schema } = require('mongoose');

const customerSchema = new Schema({
  userId: Number,
  firstName: String,
  lastName: String
});

module.exports = customerSchema;
