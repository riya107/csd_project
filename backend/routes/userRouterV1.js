const express = require("express");
const {signup, login, getUser} = require("../controllers/userControllerV1");

const router = express.Router();

router.get("/", getUser);

router.post("/signup", signup);

router.post("/login", login);


module.exports = router;