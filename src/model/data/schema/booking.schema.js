const { Schema } = require('mongoose');

const bookingSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    required: true 
  },
  customerId: {
    type: Schema.Types.ObjectId,
    required: true 
  },
  status: {
    type: String,
    enum: [ 'ongoing', 'cancelled', 'completed' ],
    required: true
  },
  serviceType: {
    type: String,
    enum: [ 'casual', 'deep', 'green' ],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  specification: String,
  visit: new Schema({
    status: {
      type: String,
      enum: [ 'in progress', 'completed', 'cancelled', ]
    },
    date: {
      type: Date,
      required: true
    }
  }, { _id: false })
},
{ versionKey: false });

module.exports = bookingSchema;
