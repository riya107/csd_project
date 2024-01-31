const FoodItem = require("../models/FoodItem");
const User = require("../models/User");
const logger = require("../logger");

exports.updateMenu = async (req, res) => {
  logger.info("Request came for updating menu");
  try {
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
    return res
      .status(200)
      .json({
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
