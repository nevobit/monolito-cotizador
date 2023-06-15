const { Router } = require('express');

const router = new Router();

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    let extension = file.originalname.split('.')
    extension = extension[extension.length - 1]
    cb(null, `${Math.random().toString(36).substring(0, 6)}.${extension}`);
  }
})
const uploadImage = multer({
  storage,
  limits: { fileSize: 2000000 }
});

module.exports = uploadImage;
