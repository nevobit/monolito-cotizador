const nodemailer = require("nodemailer");
const { nodemailer_email, nodemailer_password } = require("../config.js");
const Mailgen = require('mailgen');

const NodeMailer = (req, res) => {
  const { userEmail } = req.params;

  let config = {
    service: "gmail",
    auth: {
      user: nodemailer_email,
      pass: nodemailer_password,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "Daily Tuition",
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: nodemailer_email,
    to: userEmail,
    subject: "Place Order",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

};

module.exports = NodeMailer;
