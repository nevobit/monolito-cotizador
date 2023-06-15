const { Schema, model } = require('mongoose')

const MarkingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: true,
  },
  inks: [
    {
      name: {
        type: String,
        required: true
      },
      minTotalPrice: {
        type: Number,
        required: true
      },
      outOfRangePrice: {
        type: Number,
        required: true,
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
          price: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ]
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Marking", MarkingSchema);
