require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "campusFoodDeliveryService",
  })
  .then(() => {
    console.log("Connected to the Database.");
  })
  .catch((err) => console.error(err));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}.`);
});
