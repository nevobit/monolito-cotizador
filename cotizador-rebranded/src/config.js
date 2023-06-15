require('dotenv').config()
const path = require('path')

const port = process.env.PORT

const secretJWT = process.env.SECRET_JWT

const mongoDBURL = process.env.MONGODB_URL

const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cotizador API',
      version: '1.0.0'
    }
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`]
}


module.exports = {
  port,
  secretJWT,
  swaggerSpec,
  mongoDBURL
}
