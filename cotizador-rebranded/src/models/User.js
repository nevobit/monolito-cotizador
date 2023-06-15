const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  webAddress: {
    type: String,
    required: false
  },
  logo: {
    type: String,
    required: false
  },
  logo2: {
    type: String,
    required: false
  },
  nit: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  businessName: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  quoteNumber: {
    type: Number,
    required: true,
    default: 0
  },
  mainColor: {
    type: String,
    required: false
  },
  secondaryColor: {
    type: String,
    required: false
  },
  discount: {
    outOfRangeDiscount: {
      type: Number,
      required: true,
      default: 0
    },
    ranges: [
      {
        min: {
          type: Number,
          required: true
        },
        max: {
          type: Number,
          required: true
        },
        discount: {
          type: Number,
          required: true
        }
      }
    ]
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", UserSchema);
