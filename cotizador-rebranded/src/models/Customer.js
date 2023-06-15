const { Schema, model } = require('mongoose')

const CustomerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  businessName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
  },
  webAddress: {
    type: String,
  },
  logo: {
    type: String,
  },
  nit: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Customer", CustomerSchema);
