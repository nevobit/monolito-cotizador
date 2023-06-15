const Product = require('../models/Product');
const axios = require('axios').default
const HttpsProxyAgent = require("https-proxy-agent")
const _ = require('lodash')

const updateProducts = async (req, res) => {
  try {
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
        prices
      }
      return product
    })
    finalListOfProducts = _.uniqBy(finalListOfProducts, (p) => p.sku)
    await Product.deleteMany({})
    const result = await Product.insertMany(finalListOfProducts)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to create a new product.
 * @returns {Object} Success message or error message
 */
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    return res.status(200).json({ message: 'Product created successfully' })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

/**
 * Function that allows to create a new customer.
 * @returns {Object} Success message or error message
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json(products)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

/**
 * Function that allows to get a product.
 * @returns {Object} Success message or error message
 */
const getProduct = async (req, res) => {
  const { id } = req.params

  try {
    const products = await Product.findById(id)
    return res.status(200).json(products)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

/**
 * Function that to get the stock of a product by its reference.
 * @returns {Array} Stock of a product
 */
const getStock = async (req, res) => {
  const { reference } = req.params

  try {
    //const httpsAgent = new HttpsProxyAgent({ host: '154.9.32.21', port: '8800' })
    const stock = (await axios.get(`https://api.cataprom.com/rest/stock/${reference}`)).data.resultado
    return res.status(200).json(stock)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

/**
 * Function that allows to edit a product.
 * @returns {Object} Success message or error message
 */
 const editProduct = async (req, res) => {
  const { _id } = req.body

  try {
    await Product.updateOne({ _id }, req.body).exec()
    return res.status(200).json({ message: 'Product updated successfully' })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to get the products of a user.
 * @returns {Array || Object} Array of products or error message
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const result = await Product.deleteOne({ _id: id }).exec()
    if (result.deletedCount === 0) return res.status(400).json({ message: 'Product not found' })
    return res.status(200).json({ message: 'Product removed successfully', result })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
  updateProducts,
  getStock
}