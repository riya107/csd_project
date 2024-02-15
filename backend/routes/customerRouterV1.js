const express = require("express");
const {restrict, allowOnlyCustomers} = require("../middlewares/middlewares");
const {search, getItemsByShopId, getShopsByItemName, getCustomerOrders} = require("../controllers/customerControllerV1");
const router = express.Router();

router.get("/search", search);
router.get("/shop-items-by-id/:_id", getItemsByShopId);
router.get("/shops-by-item-name/:name", getShopsByItemName);

router.get(
    "/orders",
    restrict,
    allowOnlyCustomers,
    getCustomerOrders
  );

module.exports = router;