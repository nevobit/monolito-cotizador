const express = require('express');
const router = express.Router();
const quoteCtrl = require('../controllers/quote.controller')
const { verifyToken } = require('../middlewares/authJWT')

/**
 * @swagger
 * components:
 *  schemas:
 *    Quote:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The customer name
 *        inks:
 *          type: array
 *          description: inks
 *        phone:
 *          type: number
 *          description: The customer phone
 *      required:
 *        - userId
 *        - name
 *      example:
 *        name: Andres Rios
 *        email: andres@example.com
 *        phone: 1111111
 */

/**
 * @swagger
 * /quote/:
 *  post:
 *    summary: Create a new quote
 *    tags: [Quote]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Quote'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: New quote created
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.post("/", [verifyToken, quoteCtrl.createQuote])

/**
 * @swagger
 * /quote/:
 *  get:
 *    summary: Get quotes of a user
 *    tags: [Quote]
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: Get quotes successfully
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/", [verifyToken, quoteCtrl.getQuotes])

/**
 * @swagger
 * /quote/{id}:
 *  get:
 *    summary: Get quote of a user
 *    tags: [Quote]
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *      required: true
 *    responses:
 *      200:
 *        description: Get quotes successfully
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/:id", [verifyToken, quoteCtrl.getQuote])

/**
 * @swagger
 * /quote/:
 *  put:
 *    summary: Update a quote
 *    tags: [Quote]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Quote'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: Quote edited successfully
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.put("/", [verifyToken, quoteCtrl.editQuote])


/**
* @swagger
* /quote/{id}:
*  delete:
*    summary: Delete a quote
*    tags: [Quote]
*    parameters:
*    - in: header
*      name: jwt-token
*      schema:
*        type: string
*        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
*      required: true
*    - in: path
*      name: id
*      schema:
*        type: string
*        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
*      required: true
*    responses:
*      200:
*        description: New quote created
*      400:
*        description: Something went wrong
*      500:
*        description: Server error
*/
router.delete("/:id", [verifyToken, quoteCtrl.deleteQuote])

module.exports = router;
