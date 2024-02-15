const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    shop_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        item_id: {
          type: mongoose.Schema.ObjectId,
          ref: "FoodItem",
          required: true,
        },
        item_name: {
          type: String,
          required: true,
        },
        item_quantity: {
          type: Number,
          required: true,
        },
        item_price: {
          type: Number,
          required: true,
        },
      },
    ],
    total_price: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["Placed", "Accepted", "Declined", "Delivered"],
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
