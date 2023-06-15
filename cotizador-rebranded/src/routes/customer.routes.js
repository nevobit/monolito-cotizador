const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customer.controller')
const { verifyToken } = require('../middlewares/authJWT')

/**
 * @swagger
 * components:
 *  schemas:
 *    Customer:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The customer name
 *        email:
 *          type: string
 *          description: The customer email
 *        webAddress:
 *          type: string
 *          description: The customer web address
 *        logo:
 *          type: string
 *          description: The customer logo
 *        nit:
 *          type: number
 *          description: The customer nit
 *        address:
 *          type: string
 *          description: The customer address
 *        businessName:
 *          type: string
 *          description: The customer businessName
 *        phone:
 *          type: number
 *          description: The customer phone
 *      required:
 *        - name
 *      example:
 *        name: Alancito Kay
 *        email: alan@example.com
 *        webAddress: www.example.com
 *        nit: 654321
 *        address: Av98 98 98
 *        businessName: example
 *        phone: 123456
 */

/**
 * @swagger
 * /customer/:
 *  post:
 *    summary: Create a new customer
 *    tags: [Customer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Customer'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: New customer created
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.post("/", [customerCtrl.createCustomer])

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
router.get("/", [customerCtrl.getCustomersByUserId])

/**
 * @swagger
 * /customer/{id}:
 *  get:
 *    summary: Get customer by id
 *    tags: [Customer]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *        required: true
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          example: 1111
 *    responses:
 *      200:
 *        description: Get customer info
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/:id", [verifyToken, customerCtrl.getCustomerById])

/**
 * @swagger
 * /customer/:
 *  put:
 *    summary: Edit a customer
 *    tags: [Customer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Customer'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: New customer created
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
 router.put("/", [verifyToken, customerCtrl.editCustomer])

/**
 * @swagger
 * /customer/{id}:
 *  delete:
 *    summary: Delete customer by id
 *    tags: [Customer]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *        required: true
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          example: 1111
 *    responses:
 *      200:
 *        description: Deleted customer
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
 router.delete("/:id", [verifyToken, customerCtrl.deleteCustomerById])

module.exports = router;
