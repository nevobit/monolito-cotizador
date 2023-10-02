const Quote = require('../models/Quote');
const User = require('../models/User');

/**
 * Function that allows to create a new quote.
 * @returns {Object} Success message or error message
 */
const createQuote = async (req, res) => {
  const { userId } = req
try {
    const quoteNumber = (await User.findById(userId)).quoteNumber
    let newQuote = new Quote({ ...req.body, userId })
    newQuote.quoteNumber = quoteNumber
    await newQuote.save()
    await User.updateOne({ _id: userId }, { $set: { quoteNumber: quoteNumber + 1 } })
    return res.status(200).json({ message: 'Quote created successfully' })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

/**
 * Function that allows to create a new customer.
 * @returns {Object} Success message or error message
 */
const getQuotes = async (req, res) => {

  const { userId } = req.body

  try {
    const quotes = await Quote.find({ userId })
    return res.status(200).json(quotes)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

/**
 * Function that allows to get a quote of a user.
 * @returns {Object} Quote or error message
 */
const getQuote = async (req, res) => {
  const { userId } = req
  const { id } = req.params

  try {
    const quote = await Quote.findOne({ userId, _id: id }).exec()
    return res.status(200).json(quote)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to edit a quote.
 * @returns {Object} Success message or error message
 */
const editQuote = async (req, res) => {
  const { _id } = req.body
  const { userId } = req

  try {
    await Quote.updateOne({ userId, _id }, req.body).exec()
    return res.status(200).json({ message: 'Quote updated successfully' })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to get the quotes of a user.
 * @returns {Array || Object} Array of quotes or error message
 */
const deleteQuote = async (req, res) => {
  const { userId } = req
  const { id } = req.params

  try {
    const result = await Quote.deleteOne({ _id: id, userId }).exec()
    if (result.deletedCount === 0) return res.status(400).json({ message: 'Quote not found' })
    return res.status(200).json({ message: 'Quote removed successfully', result })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

module.exports = {
  createQuote,
  getQuotes,
  getQuote,
  editQuote,
  deleteQuote
}

//<<<<<<<<<<<<