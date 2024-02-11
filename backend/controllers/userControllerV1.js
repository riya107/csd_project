const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../logger");
const User = require("../models/User");

exports.signup = async (req, res) => {
  logger.info("Request came for signup");
  try {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    const userData = {
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password: secPassword,
      phone_number: req.body.phone_number,
    };
    if (userData.role === "shop") {
      userData.food_items = [];
      const existingUser = await User.find({name:req.body.name});
      if(existingUser.length!==0){
        return res.status(400).json({ success: false, message: "Aready a shop with same name!" });
      }
    }
    const user = new User(userData);

    const createdUser = await user.save();

    const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);
    return res.status(201).json({
      success: true,
      token: token,
      user: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        phone_number: createdUser.phone_number,
      },
      message: "process successful",
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
};

exports.login = async (req, res) => {
  logger.info("Request came for login");
  try {
    const user = req.body;
    const userData = await User.findOne({ email: user.email }).select(
      "_id name email role phone_number password"
    );

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "sign in with correct credentials" });
    } else {
      const match = await bcrypt.compare(user.password, userData.password);

      if (match) {
        const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET);

        userData.set({password:undefined});

        return res.status(200).json({
          success: true,
          token: token,
          user: userData,
          message: "process successful",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "sign in with correct credentials",
        });
      }
    }
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
};

exports.getUser = async (req, res) => {
  logger.info("Request came for getting user");
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    } else {
      const info = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById({ _id: info._id }).select(
        "_id name email role phone_number"
      );

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized User" });
      }
      return res
        .status(200)
        .json({ success: true, user: user, message: "process successful" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ success: false, message: "process failed" });
  }
};
