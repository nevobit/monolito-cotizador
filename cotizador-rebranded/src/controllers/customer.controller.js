const Customer = require("../models/Customer");

/**
 * Function that allows to create a new customer.
 * @returns {Object} Success message or error message
 */
const createCustomer = async (req, res) => {
  const userId = "627c513b3a242824b5ec6c78";

  try {
    const newCustomer = new Customer({ ...req.body, userId });
    await newCustomer.save();
    return res.status(200).json({ message: "Customer created!" });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

/**
 * Function to get all customers of a user
 * @returns {Array} customer array
 */
const getCustomersByUserId = async (req, res) => {
  const userId = "627c513b3a242824b5ec6c78";
  try {
    const customers = await Customer.find({ userId }).exec();
    return res.json(customers);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

/**
 * Function to get a customer
 * @returns {Array} customer array
 */
const getCustomerById = async (req, res) => {
  const userId = "627c513b3a242824b5ec6c78";
  const { id } = req.params;

  try {
    const customer = await Customer.findOne({ _id: id, userId });
    if (!customer)
      return res.status(400).json({ message: "Customer not found" });
    return res.json(customer);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

/**
 * Function that allows to edit a customer
 * @returns message
 */
const editCustomer = async (req, res) => {
  const customer = req.body;
  const { userId } = req;

  try {
    const { modifiedCount } = await Customer.updateOne(
      { _id: customer._id, userId },
      { $set: customer }
    ).exec();
    if (modifiedCount === 0)
      return res.status(400).json({ message: "Customer not found" });
    return res.status(200).json({ message: "Customer successfully edited" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

/**
 * Function to delete a customers of a user
 * @returns {Object} message
 */
const deleteCustomerById = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    const { deletedCount } = await Customer.deleteOne({
      _id: id,
      userId,
    }).exec();
    if (deletedCount === 0)
      return res.status(400).json({ message: "Customer not found" });
    return res.status(200).json({ message: "Customer removed successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  createCustomer,
  getCustomersByUserId,
  getCustomerById,
  editCustomer,
  deleteCustomerById,
};
