const { Schema } = require('mongoose');

const residenceSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    required: true 
  },
  houseType: {
    type: String,
    enum: [ 'house', 'condo', 'apartment' ],
    required: true
  },
  size: {
    type: Number,
    required: true 
  },
  empty: {
    type: Number,
    required: true 
  },
  furnished: {
    type: Number,
    required: true 
  },
  pet: {
    type: Number,
    required: true 
  },
  bedroom: {
    type: Number,
    required: true 
  },
  bathroom: {
    type: Number,
    required: true 
  },
  den: {
    type: Number,
    required: true 
  },
  frequency: {
    type: String,
    enum: [ 'once', 'weekly', 'bi-weekly', 'monthly' ],
    required: true
  },
  address: String
});

module.exports = residenceSchema;
