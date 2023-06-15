const { Schema, model } = require('mongoose')

const UsbDiscountSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
    default: 1
  },
  outOfRangeDiscount: {
    type: Number,
    required: true,
    default: 0
  },
  ranges: [
    {
      min: {
        type: Number,
        required: true,
        default: 0
      },
      max: {
        type: Number,
        required: true,
        default: 1
      },
      discount: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ]
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("UsbDiscount", UsbDiscountSchema);
