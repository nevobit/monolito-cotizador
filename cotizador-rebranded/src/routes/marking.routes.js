const express = require('express');
const router = express.Router();
const markingCtrl = require('../controllers/marking.controller')
const { verifyToken } = require('../middlewares/authJWT')

/**
 * @swagger
 * components:
 *  schemas:
 *    Marking:
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
 * /marking/:
 *  post:
 *    summary: Create a new marking
 *    tags: [Marking]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Marking'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: New marking created
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.post("/", [verifyToken, markingCtrl.createMarking])

/**
 * @swagger
 * /marking/:
 *  get:
 *    summary: Get markings of a user
 *    tags: [Marking]
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: Get markings successfully
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/", [verifyToken, markingCtrl.getMarkings])

/**
 * @swagger
 * /marking/{id}:
 *  get:
 *    summary: Get marking of a user
 *    tags: [Marking]
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
 *        description: Get markings successfully
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/:id", [verifyToken, markingCtrl.getMarking])

/**
 * @swagger
 * /marking/:
 *  put:
 *    summary: Update a marking
 *    tags: [Marking]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Marking'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: Marking edited successfully
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.put("/", [verifyToken, markingCtrl.editMarking])


/**
* @swagger
* /marking/{id}:
*  delete:
*    summary: Delete a marking
*    tags: [Marking]
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
*        description: New marking created
*      400:
*        description: Something went wrong
*      500:
*        description: Server error
*/
router.delete("/:id", [verifyToken, markingCtrl.deleteMarking])

module.exports = router;
