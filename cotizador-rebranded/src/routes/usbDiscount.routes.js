const express = require('express');
const router = express.Router();
const usbDiscountCtrl = require('../controllers/usbDiscount.controller')
const { verifyToken } = require('../middlewares/authJWT')

/**
 * @swagger
 * components:
 *  schemas:
 *    Discount:
 *      type: object
 *      properties:
 *        outOfRangeDiscount:
 *          type: number
 *          description: Discount out of price range
 *        ranges:
 *          type: array
 *          description: The user email
 *      required:
 *        - outOfRangeDiscount
 *      example:
 *        outOfRangeDiscount: 20
 *        ranges: [
 *                  min: 1000000,
 *                  max: 1999999,
 *                  discount: 4,
 *                ]
 */

/**
 * @swagger
 * /usbdiscount:
 *  get:
 *    summary: Get discount
 *    tags: [Discount]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjE5NTFkMjhhZjc5ZTFkYmZmYTJhOCIsImlhdCI6MTY0NjM2ODA1Nn0.lG9s_sMGmnVJfp3TDJpbmSmZfxcu0WKHRRM5UCEqV-Y
 *        required: true
 *    responses:
 *      200:
 *        description: Get discount
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/", [verifyToken, usbDiscountCtrl.getUsbDiscount])

/**
 * @swagger
 * /usbdiscount:
 *  put:
 *    summary: Edit discount
 *    tags: [Discount]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjE5NTFkMjhhZjc5ZTFkYmZmYTJhOCIsImlhdCI6MTY0NjM2ODA1Nn0.lG9s_sMGmnVJfp3TDJpbmSmZfxcu0WKHRRM5UCEqV-Y
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Discount'
 *    responses:
 *      200:
 *        description: Discuount edited
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.put("/", [verifyToken, usbDiscountCtrl.editUsbDiscount])

module.exports = router;
