const FoodItem = require("../models/FoodItem");
const User = require("../models/User");
const Order = require("../models/Order");

const logger = require("../logger");

exports.updateMenu = async (req, res) => {
  logger.info("Request came for updating menu");
  try {
    const existingItem = await FoodItem.find({
      itemName: req.body.itemName,
      shop_id: req.user._id,
    });
    if (existingItem.length !== 0) {
      return res
        .status(400)
        .json({ success: false, message: "Duplicate Item" });
    }
    const foodItem = new FoodItem({
      itemName: req.body.itemName,
      itemPrice: req.body.itemPrice,
      image: req.image,
      type: req.body.type,
      shop_id: req.user._id,
    });

    const createdFoodItem = await foodItem.save();

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { food_items: createdFoodItem._id },
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "process successful" });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

exports.getMenu = async (req, res) => {
  logger.info("Request came for getting menu");
  try {
    const shop_id = req.user._id;
    const foodItems = await FoodItem.find({ shop_id });
    return res.status(200).json({
      success: true,
      foodItems: foodItems,
      message: "process successful",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

exports.getShopOrders = async (req, res) => {
  logger.info(`Request came for orders of shop with ID = ${req.user._id}`);
  try {
    const orders = await Order.find({
      shop_id: req.user._id,
      $or: [{ status: "Placed" }, { status: "Accepted" }],
    }).sort({ updatedAt: -1 });
    return res.status(200).json({
      success: true,
      orders: orders,
      message: "process successful",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
