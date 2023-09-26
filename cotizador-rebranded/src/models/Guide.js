const { Schema, model } = require("mongoose");

const GuideSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

module.exports = model("Guide", GuideSchema);
