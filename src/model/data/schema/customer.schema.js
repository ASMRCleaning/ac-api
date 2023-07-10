const { Schema } = require('mongoose');

const customerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true 
  },
  firstName: {
    type: String,
    required: true 
  },
  lastName: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
},
{ versionKey : false });

module.exports = customerSchema;
