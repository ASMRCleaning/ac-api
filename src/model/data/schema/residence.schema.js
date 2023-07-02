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
    type: Boolean,
    required: true 
  },
  furnished: {
    type: Boolean,
    required: true 
  },
  pet: {
    type: Boolean,
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
  address: new Schema({
    streetAddress: String,
    unit: String,
    postalCode: String,
    city: String,
    province: String,
    country: String
  }, { _id: false })
},
{ versionKey: false});

module.exports = residenceSchema;
