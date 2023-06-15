const UsbDiscount = require("../models/UsbDiscount")

/**
 * Function to get the discounts
 * @returns message
 */
const getUsbDiscount = async (req, res) => {
  const { userId } = req

  try {
    const discount = await UsbDiscount.findById(1).exec()
    return res.status(200).json(discount)
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

/**
 * Function that allows to edit the discounts of a user
 * @returns message
 */
const editUsbDiscount = async (req, res) => {
  const discount = req.body
  const { userId } = req

  try {
    const resDiscount = await UsbDiscount.updateOne({ _id: 1 }, discount).exec()
    return res.status(200).json(resDiscount)
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

module.exports = {
  editUsbDiscount,
  getUsbDiscount
}