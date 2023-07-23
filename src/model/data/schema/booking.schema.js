const { Schema } = require('mongoose');

const bookingSchema = new Schema({
  employeeId: Schema.Types.ObjectId,
  customerId: {
    type: Schema.Types.ObjectId,
    required: true 
  },
  residenceId: {
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
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  specification: String,
  visits: {
    type: [ new Schema({
      // The "visit" object will have an _id property automatically
      status: {
        type: String,
        enum: [ 'in progress', 'completed', 'cancelled' ]
      },
      date: {
        type: Date,
        required: true
      }
    }) ],
    default: []
  }
},
{ versionKey: false });

module.exports = bookingSchema;
