const user = require('./routes/user.routes')
const customer = require('./routes/customer.routes')
const marking = require('./routes/marking.routes')
const product = require('./routes/product.routes')
const products = require('./routes/products.routes')
const image = require('./routes/image.routes')
const quote = require('./routes/quote.routes')
const discount = require('./routes/discount.routes')
const usbdiscount = require('./routes/usbDiscount.routes')
const mailer = require("./routes/mailer.route")
const guide = require("./routes/guide.routes")

const routes = (app) => {
  app.use('/user', user)
  app.use('/customer', customer)
  app.use('/marking', marking)
  app.use('/product', product)
  app.use('/products', products)
  app.use('/image', image)
  app.use('/quote', quote)
  app.use('/discount', discount)
  app.use('/usbdiscount', usbdiscount)
  app.use('/mailer', mailer)
  app.use('/guide', guide)
}

module.exports = routes;
