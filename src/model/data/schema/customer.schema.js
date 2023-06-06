const { Schema } = require('mongoose');

const customerSchema = new Schema({
  userId: Schema.ObjectId,
  firstName: String,
  lastName: String,
});

module.exports = customerSchema;
