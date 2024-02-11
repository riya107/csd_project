const FoodItem = require("../models/FoodItem");
const User = require("../models/User");
const logger = require("../logger");

exports.search = async (req, res) => {
  logger.info("Request came for search");
  try {
    const searchQuery = req.query.q || "";
    const shops = await User.find({
      $and: [
        { role: "shop" },
        { name: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .select("name")
      .exec();

    const foodItems = await FoodItem.aggregate([
      { $match: { itemName: { $regex: searchQuery, $options: "i" } } },
      { $group: { _id: "$itemName", image: { $first: "$image" } } },
    ]);

    return res.status(200).json({
      success: true,
      searchResults: [...shops, ...foodItems],
      message: "process successful",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

exports.getItemsByShopId = async (req, res) => {
  logger.info(`Request came for items of shop wiith ID = ${req.params._id}`);
  try {
    const foodItems = await FoodItem.find({ shop_id:req.params._id });
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

exports.getShopsByItemName = async (req, res) => {
  logger.info("Request came for shops");
  try {
        const shops = await FoodItem.aggregate([
          { 
              $match: { itemName: { $regex: req.params.name, $options: "i" } }
          },
          {
              $lookup: {
                  from: "users",
                  localField: "shop_id",
                  foreignField: "_id",
                  as: "shop"
              }
          },
          {
              $unwind: "$shop"
          },
          {
              $project: {
                  _id: "$shop._id",
                  name: "$shop.name"
              }
          }
      ]);
    return res.status(200).json({
      success: true,
      shops:shops,
      message: "process successful",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
