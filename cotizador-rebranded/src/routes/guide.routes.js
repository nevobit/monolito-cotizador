const express = require("express");
const router = express.Router();
const guideCtrl = require('../controllers/guide.controller')
const { verifyToken } = require('../middlewares/authJWT')

router.post("/", [ guideCtrl.createGuide]);
router.get("/", [ guideCtrl.getGuides]);

module.exports = router;