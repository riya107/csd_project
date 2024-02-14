const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const firebaseConfig = require("../firebase-config");

const firebase_app = initializeApp(firebaseConfig);
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const logger = require("../logger");

exports.restrict = async (req, res, next) => {
  console.log("middleware called")
  logger.info("Inside restrict middleware");
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    } else {
      const info = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById({ _id: info._id });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized User" });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal sever error" });
  }
};

exports.allowOnlyCustomers = (req, res, next) => {
  logger.info("Inside allowOnlyCustomers middleware");
  console.log("allowOnlyCustomers called.")
  if (req.user.role === "customer") {
    next();
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized User" });
  }
};

exports.allowOnlyShops = (req, res, next) => {
  logger.info("Inside allowOnlyShops middleware");
  console.log("allowOnly Shops middleware called")
  if (req.user.role === "shop") {
    next();
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized User" });
  }
};

exports.uploadInFirebase = async (req, res, next) => {
  logger.info("Inside uploadInFirebase middleware");
  console.log("Inside uploadInFireBase middleware")
  const file = req.file;
  const fileName = Date.now() + "-" + file.originalname;
  const storage = getStorage(firebase_app);
  const storageRef = ref(storage, "uploads/" + fileName);

  try {
    await uploadBytes(storageRef, file.buffer);
    const url = await getDownloadURL(storageRef);
    req.image = url;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
};
