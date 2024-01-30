const express = require("express");
const {
  restrict,
  allowOnlyShops,
  uploadInFirebase,
} = require("../middlewares/middlewares");

const { updateMenu, getMenu } = require("../controllers/shopControllerV1");

const multer = require("multer");

const upload = multer();

const router = express.Router();

router.post(
  "/update-menu",
  restrict,
  allowOnlyShops,
  upload.single("image"),
  uploadInFirebase,
  updateMenu
);

router.get(
  "/menu",
  restrict,
  allowOnlyShops,
  getMenu
);

module.exports = router;
