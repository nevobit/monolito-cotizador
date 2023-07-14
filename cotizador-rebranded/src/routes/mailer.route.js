const express = require("express");
const router = express.Router();
const NodeMailer = require("../controllers/mailer.Controller.js");

router.post("/:email", NodeMailer);

module.exports = router;
