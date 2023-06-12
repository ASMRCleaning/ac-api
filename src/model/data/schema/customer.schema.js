const { Schema } = require('mongoose');

const customerSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true 
  },
  firstName: {
    type: String,
    required: true 
  },
  lastName: {
    type: String,
    required: true 
  }
});

module.exports = customerSchema;
