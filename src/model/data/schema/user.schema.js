const { Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: [ 'customer', 'manager', 'employee' ],
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
{ versionKey: false });

module.exports = userSchema;
