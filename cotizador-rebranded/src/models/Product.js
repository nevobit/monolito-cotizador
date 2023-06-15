const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  sku: {
    type: String,
    unique: true
  },
  name: {
    type: String,
  },
  resume: {
    type: String,
  },
  keywords: {
    type: String,
  },
  description: {
    type: String,
  },
  custom: {
    type: Boolean,
    required: true,
    default: false
  },
  prices: [
    {
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  photo: {
    type: String
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Product", ProductSchema);
