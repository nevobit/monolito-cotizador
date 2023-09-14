const cron = require('node-cron');
const _ = require('lodash')
const axios = require('axios').default
const Product = require('../models/Product');
const HttpsProxyAgent = require("https-proxy-agent")

const updateProducts = async () => {
  try {
    console.log('Actualizando productos');
    //const httpsAgent = new HttpsProxyAgent({ host: '154.9.32.21', port: '8800' })
    const categories = (await axios.get('https://api.cataprom.com/rest/categorias/')).data.resultado
    let products = []
    for (const category of categories) {
      const addProducts = async () => {
        try {
          const productsOfCategory = (await axios.get(`https://api.cataprom.com/rest/categorias/${category.id}/productos`)).data.resultado
          products = products.concat(productsOfCategory)
        } catch (error) {
          await addProducts()
        }
      }
      await addProducts()
    }
    let finalListOfProducts = products.map((p) => {
      let prices = []
      for (let i = 1; i <= 5; i++) {
        if (p[`precio${i}`] && p[`precio${i}`] > 0) {
          prices.push({
            price: p[`precio${i}`],
            description: p[`descripcionPrecio${i}`]
          })
        }
      }
      const product = {
        sku: p.referencia,
        name: p.nombre,
        resume: p.resumen,
        keywords: p.palabrasClaveSeo,
        description: p.descripcionProducto,
        photo: p.imageUrl,
        custom: false,
        prices
      }
      return product
    })
    finalListOfProducts = _.uniqBy(finalListOfProducts, (p) => p.sku)
    await Product.deleteMany({ custom: false })
    await Product.insertMany(finalListOfProducts)
    console.log('Actualizacion de productos completa');
  } catch (error) {
    console.log(error);
  }

  return true;
}

const task = cron.schedule('0 0 * * *', updateProducts)

module.exports = task

module.exports = updateProducts;
