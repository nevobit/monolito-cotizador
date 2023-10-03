const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config')

/**
 * Function that checks if a token was provided and verifies if it is valid
 * and add to req body the user id of the user to which the token belongs
 */
const verifyToken = async (req, res, next) => {
  let token = req.headers["jwt-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, secretJWT);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  // return true;
};

module.exports = { verifyToken }
