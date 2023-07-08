const { Schema } = require('mongoose');

const employeeSchema = new Schema({
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
  }
},
{ versionKey : false });

module.exports = employeeSchema;
