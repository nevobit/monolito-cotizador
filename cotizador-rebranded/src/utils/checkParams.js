/**
 * Funtion that check if all params in a objects are definined
 * @param {Array<String>} arrayParams Strings array with the key that should be defined in the object
 * @param {Object} body Object with the params to check
 * @returns True if the params are correct False otherwise
 */
const checkParams = (arrayParams, body) => {
  for (const item of arrayParams) {
    if (body[item] === undefined || body[item] === null || body[item] === '') return false
  }
  return true
}

module.exports = checkParams
