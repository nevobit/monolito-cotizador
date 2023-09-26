const Guide = require("../models/Guide");

const createGuide = async (req, res) => {
  try {
    const newGuide = new Guide({ ...req.body });
    await newGuide.save();
    return res.status(200).json({ message: "Guide created!" });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

const getGuides = async (req, res) => {
    try {
      const guides = await Guide.find().exec();
      return res.json(guides);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  

module.exports = {
  createGuide,
  getGuides
};

