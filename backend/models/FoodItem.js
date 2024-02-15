const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["Veg", "Non-veg"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItem;
