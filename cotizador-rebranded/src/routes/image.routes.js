const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customer.controller')
const { verifyToken } = require('../middlewares/authJWT')
const path = require('path')

/**
 * @swagger
 * /customer/:
 *  get:
 *    summary: Get customer list of a user
 *    tags: [Customer]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjE5NTFkMjhhZjc5ZTFkYmZmYTJhOCIsImlhdCI6MTY0NjM2ODA1Nn0.lG9s_sMGmnVJfp3TDJpbmSmZfxcu0WKHRRM5UCEqV-Y
 *        required: true
 *    responses:
 *      200:
 *        description: Get customers array
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/:filename", [(req, res) => {
  const { filename } = req.params

  try {
    const filePath = path.resolve(`${__dirname}/../uploads/${filename}`)
    return res.sendFile(filePath);
  } catch (error) {
    return res.status(400).json({ message: 'File not found' })
  }
}])


module.exports = router;
