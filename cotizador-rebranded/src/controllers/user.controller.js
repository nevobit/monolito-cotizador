const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config')
const bcrypt = require('bcryptjs');
const checkParams = require('../utils/checkParams')
const User = require('../models/User')
const fs = require('fs');

/**
 * Function that allows to create a new user.
 * @returns {Object} Success message or error message
 */
const signUp = async (req, res) => {
  console.log(req.body);
  const { password } = req.body
  const { files } = req

  const correct = checkParams(['name', 'email', 'password'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })
  const hash = await bcrypt.hash(password, 10);
  try {
    let aux = { ...req.body, password: hash }
    aux.email = aux.email.toLowerCase()
    const newUser = new User(aux)
    console.log(newUser);
    /*
    if (files.logo) {
      const file = files.logo[0]
      let extension = file.filename.split('.')
      extension = extension[extension.length - 1]
      fs.rename(`./src/uploads/${file.filename}`, `./src/uploads/${userId}.${extension}`, (err) => {
        if (err) throw err;
      })
      user.logo = `${userId}.${extension}`
    }
    if (files.logo2) {
      const file = files.logo2[0]
      let extension = file.filename.split('.')
      extension = extension[extension.length - 1]
      fs.rename(`./src/uploads/${file.filename}`, `./src/uploads/${userId}2.${extension}`, (err) => {
        if (err) throw err;
      })
      user.logo2 = `${userId}2.${extension}`
    }
    */
    await newUser.save()
    return res.status(200).json({ message: 'User created!' })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function to authenticate a user through an email and a password
 * @returns {Object} user info and jwt or error message
 */
const logIn = async (req, res) => {
  let { email, password } = req.body

  const correct = checkParams(['email', 'password'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })

  try {
    email = email.toLowerCase()
    const user = await User.findOne({ email }).exec()
    if (!user) return res.status(400).json({ message: 'Wrong email' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: "Wrong password" })
    const tokenjwt = jwt.sign({ id: user._id }, secretJWT)
    return res.json({ user, jwt: tokenjwt });
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

/**
 * Function to authenticate a user through a JWT
 * @returns {Object} user info or error message
 */
const logInJWT = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId, '-_id').exec()
    if (!user) return res.status(400).json({ message: 'User not found' })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

/**
 * Function that allows to edit a user
 * @returns message
 */
const editUser = async (req, res) => {
  let user = req.body
  const { userId } = req
  const { files } = req

  try {
    if (files.logo) {
      const file = files.logo[0]
      let extension = file.filename.split('.')
      extension = extension[extension.length - 1]
      fs.rename(`./src/uploads/${file.filename}`, `./src/uploads/${userId}.${extension}`, (err) => {
        if (err) throw err;
      })
      user.logo = `${userId}.${extension}`
    } else delete user.logo
    if (files.logo2) {
      const file = files.logo2[0]
      let extension = file.filename.split('.')
      extension = extension[extension.length - 1]
      fs.rename(`./src/uploads/${file.filename}`, `./src/uploads/${userId}2.${extension}`, (err) => {
        if (err) throw err;
      })
      user.logo2 = `${userId}2.${extension}`
    } else delete user.logo2
    const { modifiedCount } = await User.updateOne({ _id: userId }, { $set: user }).exec()
    if (modifiedCount === 0) return res.status(400).json({ message: 'User not found' })
    return res.status(200).json({ message: 'User successfully edited' })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}



module.exports = {
  signUp,
  logIn,
  logInJWT,
  editUser
}
