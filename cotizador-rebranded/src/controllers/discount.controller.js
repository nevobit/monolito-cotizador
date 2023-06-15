const Discount = require("../models/Discount")

/**
 * Function to get the discounts
 * @returns message
 */
const getDiscount = async (req, res) => {
  const { userId } = req
  try {
    const discount = await Discount.findById(1).exec()
    return res.status(200).json(discount)
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

//gg

/**
 * Function that allows to edit the discounts of a user
 * @returns message
 */
const editDiscount = async (req, res) => {
  const discount = req.body
  const { userId } = req

  try {
    const resDiscount = await Discount.updateOne({ _id: 1 }, discount).exec()
    return res.status(200).json(resDiscount)
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

module.exports = {
  editDiscount,
  getDiscount
}