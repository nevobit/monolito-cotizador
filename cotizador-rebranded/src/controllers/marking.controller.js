const checkParams = require('../utils/checkParams');
const Marking = require('../models/Marking');

/**
 * Function that allows to create a new marking.
 * @returns {Object} Success message or error message
 */
const createMarking = async (req, res) => {
  const { inks } = req.body
  const { userId } = req

  // Check that all parameters are in the body
  const correct = checkParams(['name', 'inks'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })
  for (const ink of inks) {
    const correct1 = checkParams(['name', 'minTotalPrice', 'outOfRangePrice', 'ranges'], ink)
    if (!correct1) return res.status(400).json({ message: 'Missing parameters' })
    for (const range of ink.ranges) {
      const correct2 = checkParams(['min', 'max', 'price'], range)
      if (!correct2) return res.status(400).json({ message: 'Missing parameters' })
    }
  }
  try {
    const newMarking = new Marking({ ...req.body, userId })
    await newMarking.save()
    return res.status(200).json({ message: 'Marking created successfully' })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to get the markings of a user.
 * @returns {Array || Object} Array of markings or error message
 */
const getMarkings = async (req, res) => {
  const { userId } = req

  try {
    const markings = await Marking.find({ }).exec()
    return res.status(200).json(markings)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to get a marking of a user.
 * @returns {Object} Marking or error message
 */
const getMarking = async (req, res) => {
  const { userId } = req
  const { id } = req.params

  try {
    const marking = await Marking.findById(id).exec()
    return res.status(200).json(marking)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to edit a marking.
 * @returns {Object} Success message or error message
 */
const editMarking = async (req, res) => {
  const { _id, inks } = req.body
  const { userId } = req

  // Check that all parameters are in the body
  const correct = checkParams(['name', 'inks'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })
  for (const ink of inks) {
    const correct1 = checkParams(['minTotalPrice', 'outOfRangePrice', 'ranges'], ink)
    if (!correct1) return res.status(400).json({ message: 'Missing parameters' })
    for (const range of ink.ranges) {
      const correct2 = checkParams(['min', 'max', 'price'], range)
      if (!correct2) return res.status(400).json({ message: 'Missing parameters' })
    }
  }
  try {
    await Marking.updateOne({ _id }, req.body).exec()
    return res.status(200).json({ message: 'Marking updated successfully' })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to get the markings of a user.
 * @returns {Array || Object} Array of markings or error message
 */
const deleteMarking = async (req, res) => {
  const { userId } = req
  const { id } = req.params

  try {
    const result = await Marking.deleteOne({ _id: id }).exec()
    if (result.deletedCount === 0) return res.status(400).json({ message: 'Marking not found' })
    return res.status(200).json({ message: 'Marking removed successfully', result })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

module.exports = {
  createMarking,
  getMarkings,
  getMarking,
  editMarking,
  deleteMarking
}
