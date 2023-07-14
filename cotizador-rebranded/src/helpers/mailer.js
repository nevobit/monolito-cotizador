const nodemailer = require("nodemailer");
const { nodemailer_email, nodemailer_password } = require("../config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.net",
  port: 587,
  secure: false,
  auth: {
    user: nodemailer_email,
    pass: nodemailer_password,
  },
});

module.exports = transporter;
