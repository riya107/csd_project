const express = require("express");
const {
  restrict,
  allowOnlyShops,
  uploadInFirebase,
} = require("../middlewares/middlewares");

const {
  updateMenu,
  getMenu,
  getShopOrders,
  deleteItem,
} = require("../controllers/shopControllerV1");

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

router.get("/menu", restrict, allowOnlyShops, getMenu);

router.get("/orders", restrict, allowOnlyShops, getShopOrders);

router.delete("/delete-item/:_id", restrict, allowOnlyShops, deleteItem);

module.exports = router;
