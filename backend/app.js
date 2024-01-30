require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouterV1");
const shopRouter = require("./routes/shopRouterV1");
const customerRouter = require("./routes/customerRouterV1");

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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/customer", customerRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}.`);
});
