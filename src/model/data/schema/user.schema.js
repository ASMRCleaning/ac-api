const { Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: Number
});

module.exports = userSchema;
