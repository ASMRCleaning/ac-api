const { Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: [ 'customer', 'manager', 'employee' ]
  }
});

module.exports = userSchema;
