const { Schema, model } = require('mongoose')

const QuoteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quoteNumber: {
    type: Number,
    required: true,
    default: 0
  },
  customer: {
    type: Object,
    required: true
  },
  seller: {
    type: String,
    required: false
  },
  deliveryTime: {
    type: String,
    required: false
  },
  validityPeriod: {
    type: String,
    required: false
  },
  wayToPay: {
    type: String,
    required: false
  },
  generalObservations: {
    type: String,
    required: false
  },
  products: [{
    price: {
      type: Number,
      required: true
    },
    typeOfPrice: {
      type: String,
      required: true
    },
    priceDescription: {
      type: String,
      required: false
    },
    discount: {
      type: Boolean,
      required: true,
      default: false
    },
    observations: {
      type: String,
      required: false
    },
    product: {
      sku: {
        type: String,
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
    markings: [
      {
        freight: {
          type: Number,
          required: true,
          default: 0
        },
        profit: {
          type: Number,
          required: true,
          default: 0
        },
        netPrice: {
          type: Number,
          require: true,
          default: 0
        },
        amount: {
          type: Number,
          require: true,
          default: 0
        },
        markingPrice: {
          type: Number,
          require: true,
          default: 0
        },
        unitPrice: {
          type: Number,
          require: true,
          default: 0
        },
        totalPrice: {
          type: Number,
          require: true,
          default: 0
        },
        name: {
          type: String,
          require: true,
          default: 0
        },
        ink: {
          type: Object,
          require: false
        },
        i: {
          type: Number,
          require: true,
          default: 0
        }
      }
    ]
  }]
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Quote", QuoteSchema);
