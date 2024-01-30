const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "shop"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    food_items:{
      type:[{
        type: mongoose.Schema.ObjectId,
        ref: "FoodItem",
      }],
      default: undefined
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
