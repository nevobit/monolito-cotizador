const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.cotroller')
const { verifyToken } = require('../middlewares/authJWT');
const updateProducts = require('../utils/updateProducts');

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The product name
 *        email:
 *          type: string
 *          description: The product email
 *        phone:
 *          type: number
 *          description: The product phone
 *      required:
 *        - userId
 *        - name
 *      example:
 *        name: Andres Rios
 *        email: andres@example.com
 *        phone: 1111111
 */

/**
 * 
 */
 router.post("/", [verifyToken, productCtrl.createProduct])

/**
 * @swagger
 * /product/:
 *  get:
 *    summary: Get products list
 *    tags: [Product]
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: Get products list
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/", [productCtrl.getProducts])

/**
 * @swagger
 * /product/{id}:
 *  get:
 *    summary: Get products list
 *    tags: [Product]
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: Get products list
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
 router.get("/:id", [verifyToken, productCtrl.getProduct])

/**
 * @swagger
 * /product/stock/{reference}:
 *  get:
 *    summary: Get products stock
 *    tags: [Product]
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    - in: path
 *      name: reference
 *      schema:
 *        type: string
 *        example: 22-01
 *      required: true
 *    responses:
 *      200:
 *        description: Get products stock
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
 router.get("/stock/:reference", [verifyToken, productCtrl.getStock])

/**
* @swagger
* /product/update:
*  get:
*    summary: Update product list
*    tags: [Product]
*    responses:
*      200:
*        description: Updated product list
*      400:
*        description: Something went wrong
*      500:
*        description: Server error
*/
router.get("/update", (req, res) => {
    console.log("Hola mundo")
    res.status(200).send({hola: "MUndo"})
})

router.get("/updating", (req, res) => {
    console.log("Hola mundo")
    res.status(200).send({hola: "MUndo"})
})

/**
 * @swagger
 * /product/:
 *  put:
 *    summary: Update a product
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Product'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: Product edited successfully
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
 router.put("/", [verifyToken, productCtrl.editProduct])


 /**
 * @swagger
 * /product/{id}:
 *  delete:
 *    summary: Delete a product
 *    tags: [Product]
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
 *        description: New product created
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
 router.delete("/:id", [verifyToken, productCtrl.deleteProduct])

module.exports = router;
