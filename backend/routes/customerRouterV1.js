const express = require("express");
const {search, getItemsByShopId, getShopsByItemName} = require("../controllers/customerControllerV1");
const router = express.Router();

router.get("/search", search);
router.get("/shop-items-by-id/:_id", getItemsByShopId);
router.get("/shops-by-item-name/:name", getShopsByItemName);

module.exports = router;